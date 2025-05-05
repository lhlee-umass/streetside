// Modules that are imported
import express from 'express' // framework for HTTP server
import { createProxyMiddleware } from 'http-proxy-middleware' //for routing requests
import { pino } from 'pino' // for logger

// Create an Express app instance, set the API gateway port to 3000, and create a logger instance with pino
const app = express()
const PORT = 3000
const log = pino({ transport: { target: 'pino-pretty' } })

// Middleware
app.use(express.json())

// The code below contains each route
// Routes proxy

// Listings
app.use(
  '/listings',
  createProxyMiddleware({
    target: 'http://listings-service:3001',
    changeOrigin: true,
  })
)

// Reviews
app.use(
  '/reviews',
  createProxyMiddleware({
    target: 'http://reviews-service:3002',
    changeOrigin: true,
  })
)

// Authentication
app.use(
  '/auth',
  createProxyMiddleware({
    target: 'http://auth-service:3003',
    changeOrigin: true,
  })
)

// Messages
app.use(
  '/messages',
  createProxyMiddleware({
    target: 'http://messages-service:3004',
    changeOrigin: true,
  })
)

app.listen(PORT, () => {
  log.info(`API Gateway listening on port ${PORT}`)
})
