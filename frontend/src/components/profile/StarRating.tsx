import React from 'react'

interface StarRatingProps {
  rating: number
  totalStars: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5 }) => {
  const filledStars = Math.round(rating)
  const stars = Array.from({ length: totalStars }, (_, index) =>
    index < filledStars ? '★' : '☆'
  )

  return (
    <div className="star-rating">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  )
}

export default StarRating
