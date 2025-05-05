// Import necessary modules and components
import { MapPin, Tag, Heart } from 'lucide-react'  // Importing icons for map pin, tags, and heart (favorite button)
import { Link, useParams } from 'react-router'  // Corrected import to use react-router-dom's Link and useParams
import { useState, useEffect } from 'react'  // React hooks to manage state and side effects
import { Listings } from '../api/api.ts'  // Import Listings API for fetching listing data from the backend
import { Listing } from 'src/api/types.ts'  // Import Listing type definition for type safety

// Define the ListingDetailsPage component
const ListingDetailsPage = () => {
  // State hooks to manage the listing data, loading state, and error state
  const [listing, setListing] = useState<Listing | null>(null)  // State to store the fetched listing details
  const [isLoading, setIsLoading] = useState(true)  // State to track if the data is loading
  const [error, setError] = useState<string | null>(null)  // State to store any error messages

  // Retrieve the listing ID from the URL parameters using useParams
  const { id } = useParams()  // Extracts the 'id' from the URL to fetch the specific listing

  // useEffect hook to fetch the listing details when the component mounts or when 'id' changes
  useEffect(() => {
    const fetchListing = async () => {
      if (!id) {
        setError('Listing ID is missing')  // Handle case where the ID is not available
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)  // Set loading state to true while fetching data
        const fetchedListing = await Listings.getListing(id)  // Fetch the listing details using the Listings API
        setListing(fetchedListing)  // Set the fetched listing data to state
      } catch (err) {
        setError('Failed to fetch the listing.')  // Set error state if fetching fails
        console.error(err)  // Log the error for debugging
      } finally {
        setIsLoading(false)  // Set loading state to false once fetching is complete
      }
    }

    fetchListing()  // Call the fetchListing function when the component mounts
  }, [id])  // Dependency array ensures this effect runs when the 'id' changes

  // Handle loading, error, or missing listing states
  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>  // Show loading message while data is being fetched
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>  // Show error message if fetching fails
  if (!listing)
    return <p className="text-center text-gray-500 mt-10">Listing not found.</p>  // Show message if listing is not found

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Desktop grid layout for listing images and details, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side: Listing Images */}
        <div className="lg:col-span-2">
          {/* Display images if available, otherwise show "No images available" message */}
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]}  // Display the first image for now (you can extend this for a gallery later)
              alt={listing.title}  // Alt text set to listing title for accessibility
              className="w-full aspect-video object-cover rounded-xl shadow"  // Tailwind CSS classes for styling the image
            />
          ) : (
            <p>No images available</p>  // Fallback message if no images are available
          )}
        </div>

        {/* Right side: Listing Details */}
        <div className="flex flex-col gap-6">
          {/* Title, Price, and Location */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{listing.title}</h1>  {/* Display the listing title */}
            <p className="text-green-600 text-xl font-semibold">${listing.price}</p>  {/* Display the price in green color */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />  {/* Map pin icon for location */}
              <span>{listing.location_name}</span>  {/* Display the location name */}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {listing.tags.map((tag: string, index: number) => (
              <span
                key={index}  // Use index as the key for each tag element
                className="flex items-center gap-1 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
              >
                <Tag size={12} />  {/* Tag icon */}
                {tag}  {/* Display each tag */}
              </span>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Description</h2>  {/* Heading for description section */}
            <p className="text-gray-700">{listing.description}</p>  {/* Display the description of the listing */}
          </div>

          {/* Seller Info */}
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              {/* Display the seller's image */}
              <img
                src={listing.seller_id}  // Assuming 'seller_id' holds the seller's profile image (this may need adjustment)
                alt={listing.seller_id}  // Alt text set to seller_id (it should ideally be the seller's name or ID)
                className="w-12 h-12 rounded-full object-cover"  // Styling for seller's image
              />
              <div>
                <p className="font-semibold">{listing.seller_id}</p>  {/* Display the seller's name or ID */}
                <p className="text-sm text-gray-500">
                  Joined {listing.seller_id}{' '}  {/* Assuming the seller's join date is stored in seller_id (this may need adjustment) */}
                </p>
              </div>
            </div>
            {/* Button to message the seller */}
            <Link to="/message-seller">
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Message Seller  {/* Button text */}
              </button>
            </Link>
            {/* Button to save the listing (add to favorites) */}
            <button className="w-full mt-2 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-100 text-sm flex justify-center items-center gap-1">
              <Heart size={16} /> Save Listing  {/* Heart icon for save/favorite */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetailsPage  // Export the ListingDetailsPage component for use in other parts of the app
