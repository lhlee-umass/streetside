import React from 'react'
import { Heart, MapPin, Tag } from 'lucide-react'
import { Link } from 'react-router'

// Main Card Wrapper
export const Card: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div
      className={`rounded-2xl shadow-lg bg-white overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

// Card Content (Padding Inside the Card)
export const CardContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}

// Define props type
interface ListingCardProps {
  id: string
  image: string
  title: string
  description: string
  price?: number
  location: string
  tags?: string[]
  onFavorite?: () => void
  onMessageSeller?: () => void // Add onMessageSeller function prop
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  image,
  title,
  description,
  price,
  location,
  tags = [],
  onFavorite,
  onMessageSeller, // Accept onMessageSeller as prop
}) => {
  return (
    <Card className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-lg hover:shadow-xl transition">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <CardContent className="p-4">
        <h3 className="text-xl font-bold truncate">{title}</h3>
        {price !== undefined && (
          <p className="text-lg font-semibold text-green-600">${price}</p>
        )}
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <MapPin size={16} /> <span>{location}</span>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-200 rounded-md text-black"
              >
                <Tag size={12} className="inline-block mr-1 text-black" /> {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mt-4">
          {onFavorite && (
            <button
              onClick={onFavorite}
              className="text-gray-500 hover:text-red-500"
            >
              {' '}
              <Heart size={20} />
            </button>
          )}
          <Link to={`/listing/${id}`} className="w-full md:w-auto">
            <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View Details
            </button>
          </Link>

          {/* Message Seller Button */}
          {onMessageSeller && (
            <Link to="/message-seller">
              <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Message Seller
              </button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ListingCard
