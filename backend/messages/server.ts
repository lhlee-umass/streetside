import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 3004;  
// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/messages', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Message schema and model
const messageSchema = new mongoose.Schema({
  content: String,
  senderId: String,
  receiverId: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.get('/messages', async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch {
    res.status(500).send('Error fetching messages');
  }
});

app.post('/messages', async (req: Request, res: Response) => {
  try {
    const { content, senderId, receiverId } = req.body;
    const newMessage = new Message({ content, senderId, receiverId });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
});

app.listen(port, () => {
  console.log(`Messages service running on port ${port}`);
});
