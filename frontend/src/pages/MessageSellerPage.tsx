import React, { useState } from 'react'
import { MessageBubble } from '../components/message-bubble/MessageBubble'

// Define the type for each message
type Message = {
  sender: 'seller' | 'user' // sender can either be 'seller' or 'user'
  text: string
}

const MessageSellerPage: React.FC = () => {
  const [message, setMessage] = useState('')

  // Define the messages state with the correct type
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'seller', text: 'Hello! How can I help you with this item?' },
    { sender: 'user', text: 'Hi! Is this still available?' },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      // When sending a message, we specify the sender as 'user'
      setMessages([...messages, { sender: 'user', text: message }])
      setMessage('')
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto min-h-screen flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-4">Message Seller</h2>

      <div className="flex flex-col flex-grow space-y-4 bg-gray-100 p-4 rounded-lg shadow-sm overflow-y-auto max-h-[60vh]">
        {/* Render message bubbles */}
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      {/* Message Input */}
      <div className="flex mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-4 text-lg border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default MessageSellerPage
