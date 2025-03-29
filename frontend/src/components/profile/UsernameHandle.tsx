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
    <div className="username-handle">
      <span>{username}</span>
      {isVerified && <span className="verified-badge">✔</span>}
    </div>
  )
}

export default UsernameHandle
