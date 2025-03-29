import React from 'react'

interface VerificationBadgeProps {
  isVerified: boolean
  badgeText: string
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  isVerified,
  badgeText,
}) => {
  return (
    <div
      className={`verification-badge ${isVerified ? 'verified' : 'unverified'}`}
    >
      {isVerified ? (
        <span className="badge-text">{badgeText}</span>
      ) : (
        <span className="badge-text">Not Verified</span>
      )}
    </div>
  )
}

export default VerificationBadge
