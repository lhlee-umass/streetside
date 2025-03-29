import React from 'react'

interface RewardPointsProps {
  points: number
}

const RewardPoints: React.FC<RewardPointsProps> = ({ points }) => {
  return (
    <div className="reward-points">
      <h3>Reward Points: {points}</h3>
    </div>
  )
}

export default RewardPoints
