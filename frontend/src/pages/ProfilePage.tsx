import React, { useEffect, useState } from 'react'
import { Users, Reviews } from '../api/api.ts' // Adjust the import based on where your api.js file is
import ProfilePicture from '../components/profile/ProfilePicture'
import UsernameHandle from '../components/profile/UsernameHandle'
import RewardPoints from '../components/profile/RewardPoints'
import ReviewTile from '../components/profile/ReviewTile'
import VerificationBadge from '../components/profile/VerificationBadge'
import './styles.css'
import { User, Review } from 'src/api/types.ts'

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<User | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await Users.getUser('01JQCMMJKJ65W5VBK5K17TQ2BF')
        setProfileData(userData)

        const reviewData = await Reviews.getReviewsForUser(
          '01JQCMMJKJ65W5VBK5K17TQ2BF'
        )
        setReviews(reviewData)

        // Calculate average rating
        const avgReview = await Reviews.getAverageRatingForUser(
          '01JQCMMJKJ65W5VBK5K17TQ2BF'
        )
        setAverageRating(avgReview)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures this effect runs once

  if (!profileData) {
    return <div>Loading...</div>
  }

  // Helper function to generate star icons
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStar

    return (
      <div className="star-rating">
        {'★'.repeat(fullStars)}
        {halfStar === 1 && '☆'}
        {'☆'.repeat(emptyStars)}
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-header-left">
          <ProfilePicture
            imageUrl={profileData.profile_img}
            altText="Profile Picture"
            size={200}
          />
        </div>
        <div className="profile-header-right">
          <div className="profile-info">
            <UsernameHandle
              username={profileData.username}
              isVerified={profileData.verifications.length > 0}
            />
            <VerificationBadge
              isVerified={profileData.verifications.length > 0}
              badgeText="Verified User"
            />
            {/* Average rating display */}
            <div className="average-rating">
              <h3>Average Rating: {averageRating.toFixed(1)} / 5</h3>
              {renderStars(averageRating)} {/* Display stars */}
            </div>
            <RewardPoints points={profileData.reward_points} />
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>User Reviews</h2>
        {reviews.map((review: Review, index: number) => (
          <ReviewTile
            key={index}
            reviewId={review.review_id}
            reviewerId={review.reviewer_id}
            revieweeId={review.reviewee_id}
            reviewerIsBuyer={review.reviewer_is_buyer}
            rating={review.rating}
            message={review.message}
            createdAt={review.created_at}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfilePage
