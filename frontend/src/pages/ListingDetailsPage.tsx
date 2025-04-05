import { MapPin, Tag, Heart } from 'lucide-react'
import { Link, useParams } from 'react-router' // Corrected import to use react-router-dom
import { useState, useEffect } from 'react'
import { Listings } from '../api/api.ts' // Import Listings API
import { Listing } from 'src/api/types.ts'

const ListingDetailsPage = () => {
  const [listing, setListing] = useState<Listing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { id } = useParams() // Get the listing ID from the URL

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) {
        setError('Listing ID is missing')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const fetchedListing = await Listings.getListing(id) // Now `id` is guaranteed to be a string
        setListing(fetchedListing)
      } catch (err) {
        setError('Failed to fetch the listing.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchListing()
  }, [id])

  // Handle loading and error states
  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>
  if (!listing)
    return <p className="text-center text-gray-500 mt-10">Listing not found.</p>

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Desktop grid, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side: Images */}
        <div className="lg:col-span-2">
          {/* Loop through images array */}
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]} // Display the first image for now (you can extend this for a gallery)
              alt={listing.title}
              className="w-full aspect-video object-cover rounded-xl shadow"
            />
          ) : (
            <p>No images available</p>
          )}
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
              <span>{listing.location_name}</span> {/* Display location name */}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {listing.tags.map((tag: string, index: number) => (
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
                src={listing.seller_id} // Assuming 'seller' object exists
                alt={listing.seller_id} // Assuming 'seller' object exists
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{listing.seller_id}</p>
                <p className="text-sm text-gray-500">
                  Joined {listing.seller_id}{' '}
                  {/* Assuming seller's 'joined' date */}
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
