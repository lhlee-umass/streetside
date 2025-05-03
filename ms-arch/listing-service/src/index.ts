import express, { Request, Response } from 'express'
import { pino } from 'pino'
import { v4 as uuidv4 } from 'uuid'

const PORT = 3000

const log = pino({ transport: { target: 'pino-pretty' } })
const app = express()
app.use(express.json())

// Define the Listing type
interface Listing {
  id: string
  title: string
  description: string
  image: string
  location: string
  price: number
  tags: string[]
  userId: string
}

// Simple in-memory "database"
const listings: Listing[] = []

// Get all listings
app.get('/', (req: Request, res: Response) => {
  res.json(listings)
})

// Create a new listing
app.post('/', (req: Request, res: Response) => {
  const { title, description, image, location, price, tags, userId } = req.body

  // Validate incoming data
  if (
    !title ||
    !description ||
    !image ||
    !location ||
    price == null ||
    !userId
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Create a new listing and add to the "database"
  const newListing: Listing = {
    id: uuidv4(),
    title,
    description,
    image,
    location,
    price,
    tags: tags || [],
    userId,
  }

  listings.push(newListing)
  res.status(201).json(newListing)
})

// Start the server
app.listen(PORT, () => {
  log.info(`Listings service running on port ${PORT}`)
})
