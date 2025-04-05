import React from 'react'

interface RewardPointsProps {
  points: number
  displayText?: boolean // Optional prop to decide whether to display text or just the icon and points
}

const RewardPoints: React.FC<RewardPointsProps> = ({
  points,
  displayText = true,
}) => {
  return (
    <div className="reward-points flex items-center space-x-2">
      {displayText && <h3></h3>}
      <span className="text-lg">{points}</span>
      <span role="img" aria-label="gold-coin" className="text-lg">
        🪙
      </span>
    </div>
  )
}

export default RewardPoints
