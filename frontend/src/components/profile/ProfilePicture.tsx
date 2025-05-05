// Import React
import React from 'react'

// Define the props for the ProfilePicture component
interface ProfilePictureProps {
  imageUrl: string   // URL of the profile image
  name: string       // Name of the person whose profile picture it is
  size?: number      // Optional size for the image (default is 100px)
}

// Functional component to render the profile picture
const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageUrl,
  name,
  size = 100, // Default size is 100px if not provided
}) => {
  return (
    // Render the image with dynamic styles based on the provided size
    <img
      src={imageUrl}                  // Image source URL
      alt={`Profile Picture of: ${name}`} // Alt text for accessibility
      style={{
        width: `${size}px`,           // Set width of the image based on 'size'
        height: `${size}px`,          // Set height of the image based on 'size'
        borderRadius: '50%',          // Make the image circular
        objectFit: 'cover',           // Ensure image covers the area without distortion
      }}
    />
  )
}

// Export the component for use in other parts of the app
export default ProfilePicture
