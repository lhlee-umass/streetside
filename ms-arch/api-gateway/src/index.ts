import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { pino } from 'pino'

const app = express()
const PORT = 3000
const log = pino({ transport: { target: 'pino-pretty' } })

// Middleware
app.use(express.json())

// Routes proxy
app.use(
  '/listings',
  createProxyMiddleware({
    target: 'http://listings-service:3001',
    changeOrigin: true,
  })
)
app.use(
  '/reviews',
  createProxyMiddleware({
    target: 'http://reviews-service:3002',
    changeOrigin: true,
  })
)
app.use(
  '/auth',
  createProxyMiddleware({
    target: 'http://auth-service:3003',
    changeOrigin: true,
  })
)
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
