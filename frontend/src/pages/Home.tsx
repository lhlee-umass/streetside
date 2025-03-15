import { useState, useEffect, useMemo } from 'react'
import ListingCard from '../components/listing-card/ListingCard' // Import the ListingCard component

const Home = () => {
  // Sample listing data
  const listings = useMemo(
    () => [
      {
        image:
          'https://www.realsimple.com/thmb/VK1y5TimKbELKfodjoed1yiIBYg=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Room-Board-Metro-Two-Cushion-Sofa-f945b411d3264c67ab3ec563a9c4c559.jpg',
        title: 'Cozy Apartment in the City',
        description: 'A beautiful apartment with all the amenities you need.',
        price: 1200,
        location: 'New York, NY',
        tags: ['Apartment', 'City Center'],
      },
      {
        image:
          'https://www.realsimple.com/thmb/VK1y5TimKbELKfodjoed1yiIBYg=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Room-Board-Metro-Two-Cushion-Sofa-f945b411d3264c67ab3ec563a9c4c559.jpg',
        title: 'Beachfront Property',
        description: 'Luxurious beachfront property with stunning views.',
        price: 3500,
        location: 'Malibu, CA',
        tags: ['House', 'Beachfront'],
      },
      {
        image:
          'https://www.realsimple.com/thmb/VK1y5TimKbELKfodjoed1yiIBYg=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Room-Board-Metro-Two-Cushion-Sofa-f945b411d3264c67ab3ec563a9c4c559.jpg',
        title: 'Modern Loft',
        description:
          'Spacious modern loft with open floor plan and city views.',
        price: 2200,
        location: 'San Francisco, CA',
        tags: ['Loft', 'Modern'],
      },
      {
        image:
          'https://www.realsimple.com/thmb/VK1y5TimKbELKfodjoed1yiIBYg=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Room-Board-Metro-Two-Cushion-Sofa-f945b411d3264c67ab3ec563a9c4c559.jpg',
        title: 'Downtown Studio',
        description: 'Compact studio in the heart of downtown.',
        price: 900,
        location: 'Austin, TX',
        tags: ['Studio', 'Downtown'],
      },
      {
        image:
          'https://www.realsimple.com/thmb/VK1y5TimKbELKfodjoed1yiIBYg=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Room-Board-Metro-Two-Cushion-Sofa-f945b411d3264c67ab3ec563a9c4c559.jpg',
        title: 'Cozy Apartment in the City',
        description: 'A beautiful apartment with all the amenities you need.',
        price: 1200,
        location: 'New York, NY',
        tags: ['Apartment', 'City Center'],
      },
      {
        image:
          'https://www.realsimple.com/thmb/VK1y5TimKbELKfodjoed1yiIBYg=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Room-Board-Metro-Two-Cushion-Sofa-f945b411d3264c67ab3ec563a9c4c559.jpg',
        title: 'Beachfront Property',
        description: 'Luxurious beachfront property with stunning views.',
        price: 3500,
        location: 'Malibu, CA',
        tags: ['House', 'Beachfront'],
      },
      {
        image:
          'https://www.realsimple.com/thmb/VK1y5TimKbELKfodjoed1yiIBYg=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Room-Board-Metro-Two-Cushion-Sofa-f945b411d3264c67ab3ec563a9c4c559.jpg',
        title: 'Modern Loft',
        description:
          'Spacious modern loft with open floor plan and city views.',
        price: 2200,
        location: 'San Francisco, CA',
        tags: ['Loft', 'Modern'],
      },
      {
        image:
          'https://www.realsimple.com/thmb/VK1y5TimKbELKfodjoed1yiIBYg=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/Room-Board-Metro-Two-Cushion-Sofa-f945b411d3264c67ab3ec563a9c4c559.jpg',
        title: 'Downtown Studio',
        description: 'Compact studio in the heart of downtown.',
        price: 900,
        location: 'Austin, TX',
        tags: ['Studio', 'Downtown'],
      },
    ],
    []
  )

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

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-8">
        Streetside Marketplace
      </h1>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex gap-4 mb-4">
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
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
              <option value="Loft">Loft</option>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredListings.map((listing, index) => (
            <ListingCard
              key={index}
              image={listing.image}
              title={listing.title}
              description={listing.description}
              price={listing.price}
              location={listing.location}
              tags={listing.tags}
              onFavorite={() => {
                console.log(`Favorite clicked for ${listing.title}`)
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
