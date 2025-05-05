// Import React
import React from 'react'

// Define the props for the VerificationBadge component
interface VerificationBadgeProps {
  verifications: string[] // Array of verification statuses (e.g., ['UMass'])
}

// Functional component to display verification badge
const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verifications, // Array of verifications passed to the component
}) => {
  return (
    // Conditionally render the background color based on the number of verifications
    <div
      className={`${
        verifications.length > 0 ? 'bg-green-500 py-1' : 'bg-red-500 py-3'
      } px-3 rounded-md inline-block font-semibold text-white items-center justify-center`}
    >
      {/* If there are verifications, display them, otherwise show "Not Verified" */}
      {verifications.length > 0 ? (
        <div>
          {/* Display "Verified as:" label */}
          <span className="text-m">Verified as:</span>
          
          {/* List the verification statuses */}
          <ul className="mt-1 list-none pl-0">
            {verifications.map((verification, index) => (
              // Render each verification status in a list item
              <li key={index} className="mt-1 text-m">
                {verification}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // If no verifications, display "Not Verified" text
        <span className="text-m">Not Verified</span>
      )}
    </div>
  )
}

// Export the component for use in other parts of the app
export default VerificationBadge
