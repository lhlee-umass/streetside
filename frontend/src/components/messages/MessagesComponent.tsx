// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

// Define the structure of a single message using a TypeScript interface
interface Message {
  id: string;           // Unique identifier for the message
  content: string;      // Text content of the message
  senderId: string;     // ID of the user who sent the message
  receiverId: string;   // ID of the user who receives the message
  timestamp: string;    // Timestamp when the message was sent
}

// Functional component to fetch and display messages
const MessageComponent: React.FC = () => {
  // State to store the list of messages
  const [messages, setMessages] = useState<Message[]>([]);

  // useEffect to fetch messages from the API when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch messages
    const fetchMessages = async () => {
      try {
        // Send GET request to local API endpoint
        const response = await fetch('http://localhost:3004/messages'); 
        const data = await response.json();  // Parse JSON response
        setMessages(data);                   // Update state with fetched messages
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching messages:', error);
      }
    };

    // Invoke the fetch function
    fetchMessages();
  }, []);  // Empty dependency array means this runs only once on mount

  return (
    <div>
      {/* Map through the messages and display each one */}
      {messages.map((message) => (
        <div key={message.id} className="message">
          <p><strong>{message.senderId}</strong>: {message.content}</p> {/* Show sender and message content */}
          <small>{message.timestamp}</small> {/* Show when the message was sent */}
        </div>
      ))}
    </div>
  );
};

// Export the component for use in other parts of the app
export default MessageComponent;
