// Modules that are imported
import express from 'express' // framework for HTTP server
import { pino } from 'pino' // for logger

// Create an Express app instance, set the API gateway port to 3000, and create a pino logger instance with pretty output
const app = express()
const PORT = 3000
const log = pino({ transport: { target: 'pino-pretty' } })

// Middleware to parse incoming JSON requests
app.use(express.json())

// The code below contains each route
// Routes proxy

// Map of logical service names to internal Docker URLs
const services: Record<string, string> = {
  listings: 'http://listing-service:3001',
  messages: 'http://messaging-service:3004',
  reviews: 'http://reviews-service:3002',
  auth: 'http://users-auth-service:3003',
}

// Generic proxy handler
async function proxy(
  serviceKey: string,
  req: express.Request,
  res: express.Response
) {
  const target = services[serviceKey]
  if (!target) return res.status(502).send('Unknown service')

  try {
    // Forward request to target service with same path/method/body
    const response = await fetch(`${target}${req.path}`, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })

    // Relay response back to client
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (err) {
    log.error(`Error proxying to ${serviceKey}: ${(err as Error).message}`)
    res.status(500).send('Service error')
  }
}

// Route definitions that proxy to the correct services

// app.use('/listings', (req, res) => proxy('listings', req, res))

app.all('/listings/*', (req, res) => proxy('listings', req, res))
app.all('/messages/*', (req, res) => proxy('messages', req, res))
app.all('/reviews/*', (req, res) => proxy('reviews', req, res))
app.all('/auth/*', (req: express.Request, res: express.Response) => proxy('auth', req, res))

// Also handle base routes (e.g., /listings)
app.all('/listings', (req, res) => proxy('listings', req, res))
app.all('/messages', (req, res) => proxy('messages', req, res))
app.all('/reviews', (req, res) => proxy('reviews', req, res))
app.all('/auth', (req: express.Request, res: express.Response) => proxy('auth', req, res))

// Start the gateway server
app.listen(PORT, () => {
  log.info(`API Gateway running on port ${PORT}`)
})
