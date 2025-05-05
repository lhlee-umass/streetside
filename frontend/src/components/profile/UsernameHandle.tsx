// Import React
import React from 'react'

// Define the props for the UsernameHandle component
interface UsernameHandleProps {
  username: string       // The username to display (required prop)
  isVerified?: boolean  // Optional prop to indicate if the user is verified
}

// Functional component to display the username handle
const UsernameHandle: React.FC<UsernameHandleProps> = ({
  username,               // The username passed to the component
  isVerified = false,      // Default value for isVerified is false if not provided
}) => {
  return (
    // Container for the username handle with flex alignment
    <div className="username-handle flex items-center">
      
      {/* Display the username with an "@" symbol */}
      <span>@{username}</span>
      
      {/* Conditionally render a verification badge if the user is verified */}
      {isVerified && (
        // Badge indicating verified status, styled with green background and a white checkmark
        <span className="ml-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-s">
          ✔
        </span>
      )}
    </div>
  )
}

// Export the component for use in other parts of the app
export default UsernameHandle
