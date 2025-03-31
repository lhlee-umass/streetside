import React, { useEffect, useState } from 'react'
import { Users } from '../../api/api.ts'
import { User, Review } from 'src/api/types'
import StarRating from './StarRating'

const ReviewTile: React.FC<{ review: Review }> = ({ review }) => {
  const { reviewer_id, reviewer_is_buyer, rating, message, created_at } = review

  // Convert the epoch timestamp to a readable date
  const formattedDate = new Date(
    parseInt(created_at) * 1000
  ).toLocaleDateString()
  const [userData, setUserData] = useState<User | null>(null)

  // Get reviewer user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await Users.getUser(reviewer_id)
        setUserData(userData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [reviewer_id])

  // Function to display the reviewer's name with a label based on whether they are a buyer or a seller
  const getReviewerLabel = () => {
    if (userData) {
      const name = `${userData.first_name} ${userData.last_name}`
      return reviewer_is_buyer
        ? `Review by Buyer: ${name}`
        : `Review by Seller: ${name}`
    }
    return 'Loading...'
  }

  return (
    <div className="bg-white p-6 mb-8 rounded-lg shadow-lg">
      <div className="review-header mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {getReviewerLabel()}
        </h3>
      </div>

      <div className="review-body text-gray-700">
        <p className="mb-2">
          <strong>Rating: </strong>
          <StarRating rating={rating} totalStars={5} />
          <span className="ml-2">({rating} / 5)</span>
        </p>
        <p className="mb-2">
          <strong>Is Buyer:</strong> {reviewer_is_buyer ? 'Yes' : 'No'}
        </p>
        <p className="mb-2">
          <strong>Message:</strong> {message}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Created At:</strong> {formattedDate}
        </p>
      </div>
    </div>
  )
}

export default ReviewTile
