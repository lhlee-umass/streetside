// Import React
import React from 'react'

// Define the props for the RewardPoints component
interface RewardPointsProps {
  points: number // The number of reward points to display
  displayText?: boolean // Optional boolean to control whether the text is displayed
}

// Functional component to display reward points
const RewardPoints: React.FC<RewardPointsProps> = ({
  points, // The points value to display
  displayText = true, // Default is true, meaning text will be shown by default
}) => {
  return (
    // Container for the reward points and icon, aligned horizontally
    <div className="reward-points flex items-center space-x-2">
      {/* Conditionally render the text element based on displayText prop */}
      {displayText && <h3></h3>}{' '}
      {/* Placeholder for optional text (currently empty) */}
      {/* Display the points number */}
      <span className="text-lg">{points}</span>
      {/* Display a gold coin emoji as the icon for reward points */}
      <span role="img" aria-label="gold-coin" className="text-lg">
        🪙
      </span>
    </div>
  )
}

// Export the component for use in other parts of the app
export default RewardPoints
