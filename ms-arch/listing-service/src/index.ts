// Import necessary modules
import express, { Request, Response } from 'express'   // Express for building the server, with types for request and response
import { pino } from 'pino'                            // Pino for logging
import { v4 as uuidv4 } from 'uuid'                    // UUID for generating unique IDs

const PORT = 3000  // Define the port number the server will listen on

// Initialize a Pino logger with a pretty-print transport for readable logs
const log = pino({ transport: { target: 'pino-pretty' } })

// Create an Express app instance
const app = express()

// Add middleware to parse incoming JSON request bodies
app.use(express.json())

// Define the structure of a listing using a TypeScript interface
interface Listing {
  id: string           // Unique ID for the listing
  title: string        // Title of the listing
  description: string  // Description of the listing
  image: string        // URL or path to an image
  location: string     // Location of the listing
  price: number        // Price of the listing
  tags: string[]       // Tags for categorization or search
  userId: string       // ID of the user who created the listing
}

// Create an in-memory array to store listings (acts like a temporary database)
const listings: Listing[] = []

// Define a route to retrieve all listings
app.get('/', (req: Request, res: Response) => {
  res.json(listings)  // Respond with the entire listings array as JSON
})

// Define a route to create a new listing
app.post('/', (req: Request, res: Response) => {
  // Destructure expected fields from the request body
  const { title, description, image, location, price, tags, userId } = req.body

  // Basic validation to ensure required fields are present
  if (
    !title ||
    !description ||
    !image ||
    !location ||
    price == null ||  // Specifically checks for null or undefined
    !userId
  ) {
    // Return a 400 Bad Request error if any required field is missing
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Create a new listing object with a generated UUID
  const newListing: Listing = {
    id: uuidv4(),        // Generate a unique ID for the listing
    title,
    description,
    image,
    location,
    price,
    tags: tags || [],    // Use an empty array if no tags are provided
    userId,
  }

  // Add the new listing to the in-memory array
  listings.push(newListing)

  // Respond with the newly created listing and a 201 Created status
  res.status(201).json(newListing)
})

// Start the Express server and listen on the defined port
app.listen(PORT, () => {
  log.info(`Listings service running on port ${PORT}`)  // Log that the server is running
})
