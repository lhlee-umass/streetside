// Import React and necessary hooks
import React, { useState, useEffect } from 'react'

// Define the Listing interface to type each listing object
interface Listing {
  title: string
  tags: string[]
  price: number
  condition: string
  date: string
  distance: number
  image: string
  description: string
  location: string
}

// Define the ListingComponent which receives an array of listings as props
const ListingComponent: React.FC<{ listings: Listing[] }> = ({ listings }) => {
  // State for filtered listings based on user input
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])

  // State to hold various filter options selected by the user
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    minPrice: 0,
    maxPrice: 9999999, // Default high maxPrice to include all listings by default
    condition: '',
  })

  // State to determine how listings are sorted
  const [sortOrder, setSortOrder] = useState('price_asc')

  // Effect that re-runs filtering and sorting logic when listings, filters, or sortOrder change
  useEffect(() => {
    let updatedListings = [...listings] // Clone listings to avoid mutating props

    // Filter by search term in title
    if (filters.searchTerm) {
      updatedListings = updatedListings.filter((listing) =>
        listing.title.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    // Filter by selected category (must be included in the tags)
    if (filters.category) {
      updatedListings = updatedListings.filter((listing) =>
        listing.tags.includes(filters.category)
      )
    }

    // Filter by price range
    if (filters.minPrice || filters.maxPrice !== 9999999) {
      updatedListings = updatedListings.filter(
        (listing) =>
          listing.price >= filters.minPrice && listing.price <= filters.maxPrice
      )
    }

    // Filter by item condition (New or Used)
    if (filters.condition) {
      updatedListings = updatedListings.filter(
        (listing) => listing.condition === filters.condition
      )
    }

    // Sort the filtered listings based on selected sort option
    switch (sortOrder) {
      case 'price_asc':
        updatedListings.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        updatedListings.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        updatedListings.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        break
      case 'oldest':
        updatedListings.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        break
      case 'distance':
        // Use Infinity for missing distances to push them to the end
        updatedListings.sort((a, b) => {
          const distanceA = a.distance || Infinity
          const distanceB = b.distance || Infinity
          return distanceA - distanceB
        })
        break
      default:
        break
    }

    // Update the filtered listings state
    setFilteredListings(updatedListings)
  }, [listings, filters, sortOrder])

  return (
    <div className="container mx-auto p-4 bg-lime-500 text-black min-h-screen flex items-center justify-center">
      {/* Filter Section */}
      <div className="bg-lime-400 shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

        {/* Search by Title */}
        <input
          type="text"
          placeholder="Search..."
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-white text-black"
        />

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-white text-black"
        >
          <option value="">All Categories</option>
          <option value="Furniture">Furniture</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
          <option value="Shoes">Shoes</option>
          <option value="Home Goods">Home Goods</option>
        </select>

        {/* Minimum Price Filter */}
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice || ''}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: Number(e.target.value) })
          }
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-white text-black"
        />

        {/* Maximum Price Filter */}
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
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-white text-black"
        />

        {/* Condition Filter */}
        <select
          value={filters.condition}
          onChange={(e) =>
            setFilters({ ...filters, condition: e.target.value })
          }
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-white text-black"
        >
          <option value="">Any Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>

        {/* Sort Order Selection */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg bg-white text-black"
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest Listings First</option>
          <option value="oldest">Oldest Listings First</option>
          <option value="distance">Distance</option>
        </select>
      </div>

      {/* Listings Display Section */}
      <div className="bg-lime-400 shadow-lg rounded-lg p-6 max-w-md mx-auto mt-4">
        <h3 className="text-lg font-semibold mb-4">Listings</h3>

        {/* Display filtered listings if available */}
        {filteredListings.length > 0 ? (
          filteredListings.map((listing, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-lg bg-white text-black"
            >
              <h4 className="text-md font-semibold">{listing.title}</h4>
              <p>{listing.description}</p>
              <p>Price: ${listing.price}</p>
              <p>Condition: {listing.condition}</p>
              <p>Location: {listing.location}</p>
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-auto mt-2"
              />
            </div>
          ))
        ) : (
          <p>No listings found</p> // Message if no listings match filters
        )}
      </div>
    </div>
  )
}

export default ListingComponent
