import React from 'react'

interface ProfilePictureProps {
  imageUrl: string
  altText: string
  size?: number // Default size is 100px if not provided
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  imageUrl,
  altText,
  size = 100,
}) => {
  return (
    <img
      src={imageUrl}
      alt={altText}
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
