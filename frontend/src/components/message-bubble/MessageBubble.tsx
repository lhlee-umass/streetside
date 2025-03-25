import React from 'react'

interface MessageBubbleProps {
  sender: 'user' | 'seller'
  text: string
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  sender,
  text,
}) => {
  return (
    <div
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs p-4 rounded-lg text-lg ${
          sender === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-black'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
