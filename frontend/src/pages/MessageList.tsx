// Import necessary modules and components
import React, { useState } from 'react'  // Import React and useState hook for state management
import { MessageBubble } from '../components/message-bubble/MessageBubble'  // Import the MessageBubble component to display individual messages
import { Link } from 'react-router'  // Import Link from React Router for navigation

// Define a type for a conversation
interface Conversation {
  id: number  // Unique ID for each conversation
  name: string  // Name of the person you're chatting with
  messages: Message[]  // Array of messages in the conversation
}

// Define a type for a message
interface Message {
  sender: 'seller' | 'user'  // Sender of the message (either 'seller' or 'user')
  text: string  // Message text
}

const MessageList: React.FC = () => {
  // State to manage the selected conversation, message input, and loading/error states
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null)  // Store the currently selected conversation
  const [messageInput, setMessageInput] = useState('')  // Store the text input for new messages

  // Placeholder conversation data (for demonstration purposes)
  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Laurie Lee Sauce',
      messages: [
        { sender: 'seller', text: 'Hi there! How can I help?' },
        {
          sender: 'user',
          text: 'yes u can omg it’s so cute how soon can it be picked up 🧍🏻‍♀️🧍🏻‍♀️',
        },
      ],
    },
    {
      id: 2,
      name: 'Land Man',
      messages: [
        {
          sender: 'user',
          text: 'hiiii how r u ? 🧟‍♂️ is this still available ?? 🤔',
        },
        { sender: 'seller', text: 'why yes it is 😍' },
      ],
    },
    {
      id: 3,
      name: 'Davidddd',
      messages: [
        {
          sender: 'user',
          text: 'hi i noticed this is the newest addition, can you tell me why you would want to sell',
        },
        {
          sender: 'seller',
          text: "Sadly, I have no need for it anymore, I just don't want it",
        },
      ],
    },
  ]

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      const updatedMessages = [
        ...selectedConversation.messages,  // Add the new message to the existing messages array
        { sender: 'user', text: messageInput } as const,  // Add the new message (sender = 'user')
      ]
      setSelectedConversation({
        ...selectedConversation,  // Update the selected conversation with the new messages
        messages: updatedMessages,
      })
      setMessageInput('')  // Clear the input field after sending the message
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
      {/* Left side: Conversation List */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md h-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Conversations
        </h2>
        <ul className="space-y-2">
          {/* Map over all conversations and render them as list items */}
          {conversations.map((conversation) => (
            <li
              key={conversation.id}  // Unique key for each conversation item
              className={`p-3 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-800 ${selectedConversation?.id === conversation.id ? 'bg-gray-300' : ''}`}
              onClick={() => setSelectedConversation(conversation)}  // Set selected conversation on click
            >
              {conversation.name}  {/* Display the name of the conversation */}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: Message View */}
      <div className="flex-grow bg-white p-4 rounded-lg shadow-md flex flex-col">
        {selectedConversation ? (
          <>
            {/* Header displaying conversation name and profile button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Chat with {selectedConversation.name}
              </h2>
              <Link to="/profile">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  View Profile
                </button>
              </Link>
            </div>

            {/* Display the messages in the selected conversation */}
            <div className="flex flex-col flex-grow space-y-4 bg-gray-100 p-4 rounded-lg overflow-y-auto max-h-[60vh]">
              {selectedConversation.messages.map((msg, index) => (
                <MessageBubble
                  key={index}  // Unique key for each message
                  sender={msg.sender}  // Pass the sender type ('seller' or 'user') to MessageBubble
                  text={msg.text}  // Pass the message text to MessageBubble
                />
              ))}
            </div>

            {/* Input and send button */}
            <div className="flex mt-4">
              <input
                type="text"
                value={messageInput}  // Bind message input value to state
                onChange={(e) => setMessageInput(e.target.value)}  // Update message input state on change
                className="flex-grow p-3 border border-gray-300 rounded-lg"
                placeholder="Type your message..."  // Placeholder text for the input field
              />
              <button
                onClick={handleSendMessage}  // Call handleSendMessage when the send button is clicked
                className="ml-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
              >
                Send  {/* Send button text */}
              </button>
            </div>
          </>
        ) : (
          // Display message when no conversation is selected
          <div className={'flex items-center justify-center h-full text-gray-500'}>
            Select a conversation to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageList  // Export the MessageList component for use in other parts of the app
