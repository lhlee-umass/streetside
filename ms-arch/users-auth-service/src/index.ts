import express, { Request, Response } from 'express'
import { pino } from 'pino'
import mongoose, { Document, Schema } from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { z } from 'zod'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey' // Use env var in prod
const PORT = 3000
const MONGO_URL = 'mongodb://mongodb/users' // Use a 'users' database for user data

const log = pino({ transport: { target: 'pino-pretty' } })
const app = express()
app.use(cors())
app.use(express.json())

// User type sent to clients (no password)
interface User {
  user_id: string
  username: string
  first_name: string
  last_name: string
  email: string
  reward_points: number
  profile_img: string
  verifications: string[]
}

// Internal user type (includes password)
interface InternalUser extends User {
  password: string // hashed
}

// Mongoose User Document type
interface UserDoc extends InternalUser, Document {}

const userSchema = new mongoose.Schema<UserDoc>({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  reward_points: { type: Number, default: 0 },
  profile_img: String,
  verifications: [String],
  password: { type: String, required: true },
})

const UserModel = mongoose.model<UserDoc>('User', userSchema)

mongoose.connect(MONGO_URL)
  .then(() => log.info('Connected to MongoDB'))
  .catch((error) => log.error('Error connecting to MongoDB:', error))

// Zod schemas for input validation
const registerSchema = z.object({
  username: z.string().min(1),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(1),
  profile_img: z.string().optional(),
  verifications: z.array(z.string()).optional(),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// Helper to extract and verify JWT from Authorization header
function getUserFromAuthHeader(authHeader: string | undefined, res: Response): User | undefined {
  if (!authHeader) {
    res.status(401).json({ error: 'No token' })
    return undefined
  }
  const token = authHeader.split(' ')[1]
  try {
    return jwt.verify(token, JWT_SECRET) as User
  } catch {
    res.status(401).json({ error: 'Invalid token' })
    return undefined
  }
}

// Create account
app.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const parseResult = registerSchema.safeParse(req.body)
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.errors })
    }
    const { username, first_name, last_name, email, password, profile_img, verifications } = parseResult.data
    const existing = await UserModel.findOne({ email })
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = new UserModel({
      user_id: new mongoose.Types.ObjectId().toString(),
      username,
      first_name,
      last_name,
      email,
      password: hashed,
      profile_img: profile_img || '',
      verifications: verifications || [],
      reward_points: 0,
    })
    await user.save()
    res.status(201).json({ message: 'User created' })
  } catch (err) {
    log.error('Register error', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login
app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const parseResult = loginSchema.safeParse(req.body)
    if (!parseResult.success) {
      return res.status(400).json({ error: 'Invalid input', details: parseResult.error.errors })
    }
    const { email, password } = parseResult.data
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...userObj } = user.toObject() as InternalUser
    const token = jwt.sign(userObj, JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: userObj })
  } catch (err) {
    log.error('Login error', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Auth middleware example
app.get('/auth/me', async (req: Request, res: Response) => {
  const decoded = getUserFromAuthHeader(req.headers.authorization, res)
  if (!decoded) return
  res.json(decoded)
})

// --- USERS ENDPOINTS ---
// Get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}, '-password') // Exclude password
    res.json(users)
  } catch (err) {
    log.error('Get users error', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get a single user by user_id
app.get('/users/:userId', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ user_id: req.params.userId }, '-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    log.error('Get user error', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update a user (protected route)
app.put('/users/:userId', async (req: Request, res: Response) => {
  try {
    const decoded = getUserFromAuthHeader(req.headers.authorization, res)
    if (!decoded) return
    // Only allow user to update their own details
    if (decoded.user_id !== req.params.userId) {
      return res.status(403).json({ error: 'Forbidden: cannot modify another user' })
    }
    // Only allow updating certain fields
    const updateFields = (({ first_name, last_name, profile_img, verifications, reward_points }) => ({ first_name, last_name, profile_img, verifications, reward_points }))(req.body)
    const user = await UserModel.findOneAndUpdate(
      { user_id: req.params.userId },
      { $set: updateFields },
      { new: true, projection: '-password' }
    )
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    log.error('Update user error', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  log.info(`Auth service running on port ${PORT}`)
})
