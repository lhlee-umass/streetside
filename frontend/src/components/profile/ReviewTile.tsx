import React from 'react'

interface ReviewTileProps {
  reviewId: string
  reviewerId: string
  revieweeId: string
  reviewerIsBuyer: boolean
  rating: number
  message: string
  createdAt: string
}

const ReviewTile: React.FC<ReviewTileProps> = ({
  reviewId,
  reviewerId,
  revieweeId,
  reviewerIsBuyer,
  rating,
  message,
  createdAt,
}) => {
  const formattedDate = new Date(
    parseInt(createdAt) * 1000
  ).toLocaleDateString() // Convert UNIX timestamp to a readable date

  // Render stars based on rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    return index < rating ? '★' : '☆' // Filled star if index < rating, else empty star
  }).join('') // Join stars to create a string

  return (
    <div className="review-tile">
      <div className="review-header">
        <h3>Review ID: {reviewId}</h3>
        <p>Reviewer ID: {reviewerId}</p>
        <p>Reviewee ID: {revieweeId}</p>
      </div>

      <div className="review-body">
        <p>
          <strong>Rating:</strong> {stars} ({rating} / 5)
        </p>{' '}
        {/* Display the stars here */}
        <p>
          <strong>Is Buyer:</strong> {reviewerIsBuyer ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Message:</strong> {message}
        </p>
        <p>
          <strong>Created At:</strong> {formattedDate}
        </p>
      </div>
    </div>
  )
}

export default ReviewTile
