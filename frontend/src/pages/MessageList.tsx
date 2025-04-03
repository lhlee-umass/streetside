import React, { useState } from 'react';
import { MessageBubble } from '../components/message-bubble/MessageBubble';
import { Link } from 'react-router';

// Define a type for a conversation
interface Conversation {
  id: number;
  name: string;
  messages: Message[];
}

// Define a type for a message
interface Message {
  sender: 'seller' | 'user';
  text: string;
}

const MessageList: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Placeholder conversation data
  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Laurie Lee Sauce',
      messages: [
        { sender: 'seller', text: 'Hi there! How can I help?' },
        { sender: 'user', text: 'yes u can omg it’s so cute how soon can it be picked up 🧍🏻‍♀️🧍🏻‍♀️' },
      ],
    },
    {
      id: 2,
      name: 'Land Man',
      messages: [
        { sender: 'user', text: 'hiiii how r u ? 🧟‍♂️ is this still available ?? 🤔' },
        { sender: 'seller', text: 'why yes it is 😍' },
      ],
    },
    {
      id: 3,
      name: 'Davidddd',
      messages: [
        { sender: 'user', text: 'hi i noticed this is the newest addition, can you tell me why you would want to sell' },
        { sender: 'seller', text: 'Sadly, I have no need for it anymore, I just don\'t want it' },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      const updatedMessages = [...selectedConversation.messages, { sender: 'user', text: messageInput } as const];
      setSelectedConversation({ ...selectedConversation, messages: updatedMessages });
      setMessageInput('');
    }
  };   

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
      {/* Conversation List */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md h-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Conversations</h2>
        <ul className="space-y-2">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`p-3 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-800 ${selectedConversation?.id === conversation.id ? 'bg-gray-300' : ''}`}
              onClick={() => setSelectedConversation(conversation)}
            >
              {conversation.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Message View */}
      <div className="flex-grow bg-white p-4 rounded-lg shadow-md flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Chat with {selectedConversation.name}</h2>
              <Link to="/profile">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  View Profile
                </button>
              </Link>
            </div>

            <div className="flex flex-col flex-grow space-y-4 bg-gray-100 p-4 rounded-lg overflow-y-auto max-h-[60vh]">
              {selectedConversation.messages.map((msg, index) => (
                <MessageBubble key={index} sender={msg.sender} text={msg.text} />
              ))}
            </div>

            <div className="flex mt-4">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
