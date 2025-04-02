import React from 'react'

interface StarRatingProps {
  rating: number
  totalStars: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  // Use HTTP URLs for the star images
  const fullStar =
    'https://cdn0.iconfinder.com/data/icons/zondicons/20/star-full-1024.png'
  const halfStar =
    'https://cdn0.iconfinder.com/data/icons/social-messaging-productivity-1/128/star-half-512.png'
  const emptyStar =
    'https://cdn0.iconfinder.com/data/icons/glyphpack/67/star-empty-1024.png'

  // Calculate the full, half, and empty stars
  const fullStars = Math.floor(rating) // Full stars (integer part)
  const halfStarCount = rating % 1 >= 0.5 ? 1 : 0 // Check if there is a half star
  const emptyStars = totalStars - fullStars - halfStarCount // Empty stars

  // Create the stars array with full, half, and empty stars
  const stars = [
    ...Array(fullStars).fill(
      <img src={fullStar} alt="Full star" className="w-5 h-5 mr-1" />
    ), // Full stars
    ...Array(halfStarCount).fill(
      <img src={halfStar} alt="Half star" className="w-5 h-5 mr-1" />
    ), // Half star
    ...Array(emptyStars).fill(
      <img src={emptyStar} alt="Empty star" className="w-5 h-5 mr-1" />
    ), // Empty stars
  ]

  return (
    <div className="flex items-center">
      {stars.map((star, index) => (
        <span key={index}>{star}</span> // Display each star as an image
      ))}
    </div>
  )
}

export default StarRating
