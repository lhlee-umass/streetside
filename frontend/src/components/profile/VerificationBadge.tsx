import React from 'react'

interface VerificationBadgeProps {
  verifications: string[] // Array of verification statuses (e.g., ['UMass'])
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verifications,
}) => {
  return (
    <div
      className={`${
        verifications.length > 0 ? 'bg-green-500 py-1' : 'bg-red-500 py-3'
      } px-3 rounded-md inline-block font-semibold text-white items-center justify-center`}
    >
      {verifications.length > 0 ? (
        <div>
          <span className="text-m">Verified as:</span>
          <ul className="mt-1 list-none pl-0">
            {verifications.map((verification, index) => (
              <li key={index} className="mt-1 text-m">
                {verification}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span className="text-m">Not Verified</span>
      )}
    </div>
  )
}

export default VerificationBadge
