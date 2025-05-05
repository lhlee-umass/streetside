// Import React
import React from 'react'

// Define the props for the MessageBubble component
interface MessageBubbleProps {
  sender: 'user' | 'seller'  // Indicates who sent the message
  text: string               // The message content
}

// Functional component to render a message bubble based on sender
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  sender,
  text,
}) => {
  return (
    // Outer container aligns message to the left or right based on sender
    <div
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {/* Inner container styles the bubble appearance based on sender */}
      <div
        className={`max-w-xs p-4 rounded-lg text-lg ${
          sender === 'user'
            ? 'bg-blue-500 text-white'  // User messages: blue background, white text
            : 'bg-gray-300 text-black'  // Seller messages: gray background, black text
        }`}
      >
        {text}  {/* Render the actual message text */}
      </div>
    </div>
  )
}
