import React from 'react'

interface ProfilePictureProps {
  imageUrl: string
  name: string
  size?: number // Default size is 100px if not provided
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageUrl,
  name,
  size = 100,
}) => {
  return (
    <img
      src={imageUrl}
      alt={`Profile Picture of: ${name}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  )
}

export default ProfilePicture
