import React, { useState } from 'react'  // Import React and useState hook to manage component state
import { MessageBubble } from '../components/message-bubble/MessageBubble'  // Import the MessageBubble component to display individual messages
import { Link } from 'react-router'  // Import Link for navigation to other pages 

// Define the type for each message
type Message = {
  sender: 'seller' | 'user' // sender can either be 'seller' or 'user'
  text: string // The text of the message
}

const MessageSellerPage: React.FC = () => {
    // State to manage the current message being typed
  const [message, setMessage] = useState('')

  // State to manage all the messages in the conversation, with type definition for messages
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'seller', text: 'Hello! How can I help you with this item?' },  // Initial message from seller
    { sender: 'user', text: 'Hi! Is this still available?' },  // Initial message from user
  ])

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (message.trim()) {  // Check if the message is not empty (i.e., not just whitespace)
      // Add the new message to the messages array with the sender set to 'user'
      setMessages([...messages, { sender: 'user', text: message }])  
      setMessage('')  // Clear the input field after sending the message
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto min-h-screen flex flex-col p-4">
      {/* Header section with button next to it */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Message Seller</h2>
        <Link to="/profile">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg">
            Seller Profile
          </button>
        </Link>
      </div>

      <div className="flex flex-col flex-grow space-y-4 bg-gray-100 p-4 rounded-lg shadow-sm overflow-y-auto max-h-[60vh] w-full">
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
