import React from 'react'

// Main Card Wrapper
export const Card: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div
      className={`rounded-2xl shadow-lg bg-white overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

// Card Content (Padding Inside the Card)
export const CardContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>
}
