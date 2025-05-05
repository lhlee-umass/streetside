import React, { useState, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

const MessageComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3004/messages'); 
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="message">
          <p><strong>{message.senderId}</strong>: {message.content}</p>
          <small>{message.timestamp}</small>
        </div>
      ))}
    </div>
  );
};

export default MessageComponent;
