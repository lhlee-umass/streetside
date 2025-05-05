// Importing necessary modules and components
import { useState, useEffect } from 'react'  // React hooks for managing state and side effects
import { Link } from 'react-router'  // Link component for navigation using React Router
import { Listings } from '../api/api.ts' // Import Listings API to fetch data from backend
import ListingCard from '../components/listing-card/ListingCard'  // Import the ListingCard component to display individual listings
import { Listing } from 'src/api/types.ts'  // Import type definition for Listing

const Home = () => {
  // State to store fetched listings and loading/error states
  const [listings, setListings] = useState<Listing[]>([])  // Listings data array
  const [isLoading, setIsLoading] = useState<boolean>(true)  // Loading state for fetching data
  const [error, setError] = useState<string | null>(null)  // Error state to handle any issues during data fetch

  // Fetch listings on component mount (side-effect)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true)  // Set loading to true before fetching data
        const allListings = await Listings.getListings()  // Fetch all listings using the API
        setListings(allListings.slice(0, 8))  // Limit to first 8 listings to display
      } catch (err) {
        setError('Failed to fetch listings.')  // Handle any error during fetch
        console.error(err)  // Log the error to the console for debugging
      } finally {
        setIsLoading(false)  // Set loading to false after data fetch is complete
      }
    }

    fetchListings()  // Call the function to fetch listings
  }, [])  // Empty dependency array ensures this effect runs only once when the component mounts

  // State for filter values (search term, category, min/max price)
  const [filters, setFilters] = useState({
    searchTerm: '',  // Search term for filtering listings by title
    category: '',  // Selected category for filtering
    minPrice: 0,  // Minimum price filter
    maxPrice: 9999999,  // Maximum price filter (default to very high number)
  })

  // State for filtered listings based on applied filters
  const [filteredListings, setFilteredListings] = useState(listings)

  // Effect hook to apply filters to the listings
  useEffect(() => {
    let updatedListings = [...listings]  // Start with all listings

    // Apply search filter (if any search term is provided)
    if (filters.searchTerm) {
      updatedListings = updatedListings.filter((listing) =>
        listing.title.toLowerCase().includes(filters.searchTerm.toLowerCase())  // Filter listings by title matching search term
      )
    }

    // Apply category filter (if a category is selected)
    if (filters.category) {
      updatedListings = updatedListings.filter((listing) =>
        listing.tags.includes(filters.category)  // Filter listings by category tags
      )
    }

    // Apply price range filter
    updatedListings = updatedListings.filter(
      (listing) =>
        listing.price >= filters.minPrice && listing.price <= filters.maxPrice  // Filter listings by price range
    )

    // Update the filtered listings state with the filtered result
    setFilteredListings(updatedListings)
  }, [filters, listings])  // Re-run the effect when filters or listings change

  // If listings are still loading, display a loading message
  if (isLoading) return <div>Loading...</div>
  // If there is an error fetching listings, display an error message
  if (error) return <div>{error}</div>

  return (
    <>
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center my-6 sm:my-8">
        Streetside Marketplace
      </h1>

      {/* Navigation bar for the login button */}
      <div className="flex justify-end px-4 mb-4 sm:mb-6">
        <Link to="/login">  {/* Link to the login page */}
          <button
            className="p-2 border rounded-md text-white"
            style={{ padding: '8px 15px', fontSize: '20px', cursor: 'pointer' }}
          >
            Login  {/* Login button */}
          </button>
        </Link>
      </div>

      {/* Main content container for listings and filters */}
      <div className="container mx-auto px-4">
        {/* Filters Section */}
        <div className="bg-gray-100 p-4 sm:p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Search filter */}
            <input
              type="text"
              placeholder="Search..."
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })  // Update search term filter state
              }
              className="p-2 border rounded-md text-black"
            />
            {/* Category filter */}
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })  // Update category filter state
              }
              className="p-2 border rounded-md text-black"
            >
              <option value="">All Categories</option>  {/* Default option */}
              <option value="Home Decor">Home Decor</option>
              <option value="Sporting Goods">Sporting Goods</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Furniture">Furniture</option>
            </select>
            {/* Min Price filter */}
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: Number(e.target.value) })  // Update min price filter state
              }
              className="p-2 border rounded-md text-black"
            />
            {/* Max Price filter */}
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice === 9999999 ? '' : filters.maxPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPrice: Number(e.target.value) || 9999999,  // Update max price filter state
                })
              }
              className="p-2 border rounded-md text-black"
            />
          </div>
        </div>

        {/* Grid layout for displaying filtered listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredListings.length > 0 ? (
            // If there are listings after filtering, display them
            filteredListings.map((listing) => (
              <ListingCard
                key={listing.listing_id}  // Unique key for each ListingCard
                id={listing.listing_id}
                image={listing.images[0]}  // Display the first image of the listing
                title={listing.title}  // Listing title
                description={listing.description}  // Listing description
                price={listing.price}  // Listing price
                location={
                  listing.location_lat.toString() +
                  ', ' +
                  listing.location_long.toString()  // Location of the listing as a string
                }
                tags={listing.tags}  // Tags associated with the listing
                onFavorite={() => {
                  console.log(`Favorite clicked for ${listing.title}`)  // Log when a listing is favorited
                }}
                onMessageSeller={() => {}}  // Placeholder for message functionality
              />
            ))
          ) : (
            <p>No listings available.</p>  // Message when there are no filtered listings
          )}
        </div>
      </div>
    </>
  )
}

export default Home
