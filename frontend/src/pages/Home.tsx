import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Listings } from '../api/api.ts' // Import Listings API
import ListingCard from '../components/listing-card/ListingCard' // Import the ListingCard component
import { Listing } from 'src/api/types.ts'

const Home = () => {
  // State to store fetched listings

  const [listings, setListings] = useState<Listing[]>([]) // Adjust the type based on your actual listing data structure
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch listings on component mount
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true)
        const allListings = await Listings.getListings() // Fetch all listings
        setListings(allListings.slice(0, 8)) // Get the first 8 listings
      } catch (err) {
        setError('Failed to fetch listings.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListings()
  }, [])

  // State for filter values
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    minPrice: 0,
    maxPrice: 9999999,
  })

  // State for filtered listings
  const [filteredListings, setFilteredListings] = useState(listings)

  // Effect hook to apply filters
  useEffect(() => {
    let updatedListings = [...listings]

    // Search filter
    if (filters.searchTerm) {
      updatedListings = updatedListings.filter((listing) =>
        listing.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (filters.category) {
      updatedListings = updatedListings.filter((listing) =>
        listing.tags.includes(filters.category)
      )
    }

    // Price filter
    updatedListings = updatedListings.filter(
      (listing) =>
        listing.price >= filters.minPrice && listing.price <= filters.maxPrice
    )

    setFilteredListings(updatedListings)
  }, [filters, listings])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-6 sm:my-8">
        Streetside Marketplace
      </h1>
      <div className="flex justify-end px-4 mb-4 sm:mb-6">
        <Link to="/login">
          <button
            className="p-2 border rounded-md text-white"
            style={{ padding: '8px 15px', fontSize: '20px', cursor: 'pointer' }}
          >
            Login
          </button>
        </Link>
      </div>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
              className="p-2 border rounded-md text-black"
            />
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="p-2 border rounded-md text-black"
            >
              <option value="">All Categories</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Sporting Goods">Sporting Goods</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Furniture">Furniture</option>
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: Number(e.target.value) })
              }
              className="p-2 border rounded-md text-black"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice === 9999999 ? '' : filters.maxPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPrice: Number(e.target.value) || 9999999,
                })
              }
              className="p-2 border rounded-md text-black"
            />
          </div>
        </div>

        {/* Grid layout for listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <ListingCard
                id={listing.listing_id}
                image={listing.images[0]}
                title={listing.title}
                description={listing.description}
                price={listing.price}
                location={
                  listing.location_lat.toString() +
                  ', ' +
                  listing.location_long.toString()
                }
                tags={listing.tags}
                onFavorite={() => {
                  console.log(`Favorite clicked for ${listing.title}`)
                }}
                onMessageSeller={() => {}}
              />
            ))
          ) : (
            <p>No listings available.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
