import { MapPin, Tag, Heart } from 'lucide-react'
import { Link, useParams } from 'react-router'

const ListingDetailsPage = () => {
  // Placeholder listing data
  const listings = [
    {
      id: '1',
      title: 'Modern Loft',
      price: 2200,
      location: 'San Francisco, CA',
      description: 'Bright and spacious loft...',
      image: 'https://your-image-url.jpg',
      tags: ['Loft', 'Modern'],
      seller: {
        name: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/150?img=4',
        joined: 'Feb 2024',
      },
    },
    // ...more listings
  ]

  const { id } = useParams()
  const listing = listings.find((l) => l.id === id)

  if (!listing) {
    return <p className="text-center text-gray-500 mt-10">Listing not found.</p>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Desktop grid, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side: Image */}
        <div className="lg:col-span-2">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full aspect-video object-cover rounded-xl shadow"
          />
        </div>

        {/* Right side: Details */}
        <div className="flex flex-col gap-6">
          {/* Title, price, location */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{listing.title}</h1>
            <p className="text-green-600 text-xl font-semibold">
              ${listing.price}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />
              <span>{listing.location}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {listing.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Description</h2>
            <p className="text-gray-700">{listing.description}</p>
          </div>

          {/* Seller Info */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={listing.seller.avatar}
                alt={listing.seller.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{listing.seller.name}</p>
                <p className="text-sm text-gray-500">
                  Joined {listing.seller.joined}
                </p>
              </div>
            </div>
            <Link to="/message-seller">
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Message Seller
              </button>
            </Link>
            <button className="w-full mt-2 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-100 text-sm flex justify-center items-center gap-1">
              <Heart size={16} /> Save Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetailsPage
