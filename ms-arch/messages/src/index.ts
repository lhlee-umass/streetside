import express, { Request, Response } from 'express';  // Express framework for handling HTTP requests
import cors from 'cors';  // CORS middleware for handling cross-origin requests
import mongoose from 'mongoose';  // Mongoose for MongoDB interaction

// Create an Express app instance
const app = express();

// Define the port number for the service to listen on
const port = 3004;  

// Middleware Setup
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse incoming JSON requests

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/messages')  // MongoDB connection URL
  .then(() => console.log('Connected to MongoDB'))  // Log success message
  .catch((error) => console.log('Error connecting to MongoDB:', error));  // Log any connection errors

// Define the schema for the "Message" collection in MongoDB
const messageSchema = new mongoose.Schema({
  content: String,  // Message content as a string
  senderId: String,  // ID of the sender
  receiverId: String,  // ID of the receiver
  timestamp: { type: Date, default: Date.now }  // Timestamp of when the message was sent, default to current date and time
});

// Create a model based on the message schema
const Message = mongoose.model('Message', messageSchema);

// Define the GET route to fetch all messages from the database
app.get('/messages', async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();  // Retrieve all messages from the database
    res.json(messages);  // Send the messages as a JSON response
  } catch {
    res.status(500).send('Error fetching messages');  // Return an error if the fetch fails
  }
});

// Define the POST route to send a new message
app.post('/messages', async (req: Request, res: Response) => {
  try {
    // Extract content, senderId, and receiverId from the request body
    const { content, senderId, receiverId } = req.body;

    // Create a new message using the extracted data
    const newMessage = new Message({ content, senderId, receiverId });

    // Save the new message to the database
    await newMessage.save();

    // Return the newly created message as a JSON response with status 201 (Created)
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);  // Log any errors encountered during message sending
    res.status(500).send('Error sending message');  // Return a 500 error if saving the message fails
  }
});

// Start the server to listen on the defined port
app.listen(port, () => {
  console.log(`Messages service running on port ${port}`);  // Log the server start message
});
