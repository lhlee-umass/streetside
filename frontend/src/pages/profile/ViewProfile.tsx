import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Users, Reviews, Auth } from '../../api/api.ts'
import ProfilePicture from '../../components/profile/ProfilePicture'
import UsernameHandle from '../../components/profile/UsernameHandle'
import RewardPoints from '../../components/profile/RewardPoints'
import ReviewTile from '../../components/profile/ReviewTile'
import VerificationBadge from '../../components/profile/VerificationBadge'
import { User, Review } from 'src/api/types.ts'
import StarRating from '../../components/profile/StarRating.tsx'

const ViewProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<User | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState<number>(0)

  const navigate = useNavigate()

  // Use useParams to get the user ID from the URL
  const { id } = useParams<{ id: string }>()
  // If id is not provided, default to a specific user ID
  // if (!id) {
  //   id = '01JQCMMJKJ65W5VBK5K17TQ2BF' // Default user ID
  //   id = '' // Default user ID
  // }

  // redirect to login if user not logged in and viewing their own profile
  useEffect(() => {
    const initializeProfile = async () => {
      try {
        const user = await Auth.getCurrentUser()

        console.log('Current user:', user)
        console.log('Profile ID:', id)

        if (!user && !id) {
          navigate('/login')
          return
        }

        const userData = id ? await Users.getUser(id) : user
        setProfileData(userData)

        const reviewData = await Reviews.getReviewsForUser(
          id || userData!.user_id
        )
        setReviews(reviewData)

        // Calculate average rating
        const avgReview = await Reviews.getAverageRatingForUser(
          id || userData!.user_id
        )
        setAverageRating(avgReview)
      } catch (error) {
        console.error('Failed to fetch data:', error)
        navigate('/') // Redirect to homepage on failure
      }
    }

    initializeProfile()
  }, [id, navigate])

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col p-5 items-center">
      {/* Profile Card */}
      <div className="profile-card w-full max-w-4xl p-8 rounded-lg bg-gray-900 bg-opacity-50 shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
          <ProfilePicture
            imageUrl={profileData.profile_img}
            name="Profile Picture"
            size={250}
          />
        </div>
        <div className="flex-grow space-y-5 text-left text-lg">
          <div className="space-y-5">
            <div className="text-lg font-bold text-white flex items-center">
              <UsernameHandle
                username={profileData.username}
                isVerified={profileData.verifications.length > 0}
              />
            </div>
            <VerificationBadge verifications={profileData.verifications} />
            {/* Average Rating */}
            <div className="text-lg font-bold text-white flex items-center">
              <div className="flex items-center justify-center p-4 rounded-md bg-amber-500/50 w-fit">
                <span className="mr-2">{averageRating}</span>
                <StarRating rating={averageRating} totalStars={5} />
                <span className="ml-2">({reviews.length})</span>
              </div>
            </div>
            <div className="text-lg font-bold text-white flex items-center">
              <span className="mr-2">Reward Points: </span>
              <RewardPoints points={profileData.reward_points} />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section mt-8 pb-5 w-full">
        <h2 className="text-3xl font-semibold text-white mb-8 text-center">
          User Reviews
        </h2>
        {reviews.length > 0 ? (
          reviews.map((review: Review, index: number) => (
            <ReviewTile key={index} review={review} />
          ))
        ) : (
          <div className="text-lg text-gray-400 text-center">
            No reviews available.
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewProfile
