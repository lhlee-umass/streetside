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
    <div className="reward-points">
      {displayText && <h3></h3>}
      <span
        role="img"
        aria-label="gold-coin"
        style={{ fontSize: '1.5em', marginRight: '5px' }}
      >
        🪙
      </span>
      <span>{points}</span>
    </div>
  )
}

export default RewardPoints
