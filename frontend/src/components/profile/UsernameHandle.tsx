import React from 'react'

interface UsernameHandleProps {
  username: string
  isVerified?: boolean
}

const UsernameHandle: React.FC<UsernameHandleProps> = ({
  username,
  isVerified = false,
}) => {
  return (
    <div className="username-handle flex items-center">
      <span>@{username}</span>
      {isVerified && (
        <span className="ml-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-s">
          ✔
        </span>
      )}
    </div>
  )
}

export default UsernameHandle
