import { ulid } from 'ulid'
import {
  usersDB,
  messagesDB,
  reviewsDB,
  listingsDB,
  savedListingsDB,
} from './localDB'
import type {
  AuthAPI,
  UsersAPI,
  MessagesAPI,
  ReviewsAPI,
  ListingsAPI,
  User,
} from './types'

// FIXME: delete this and figure out errors: when there is a backend, it should be the one determining these times
const curEpoch: () => string = () => (Date.now() / 1000).toFixed(0)

const BACKEND_URL = 'http://localhost:3000'

let curUser: User | null = null
let jwt: string | null = null

// Helper to fetch from backend with JWT and BACKEND_URL
async function fetchFromBackend(route: string, options: RequestInit = {}) {
  const token = jwt || localStorage.getItem('jwt')
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  const res = await fetch(`${BACKEND_URL}${route}`, {
    ...options,
    headers,
  })
  return res
}

export const Auth: AuthAPI = {
  async login(email: string, password: string) {
    const res = await fetchFromBackend('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error('Login failed')
    const { token, user } = await res.json()
    localStorage.setItem('jwt', token)
    curUser = user
    jwt = token
    await usersDB.update(user)
    return user
  },
  async logout() {
    curUser = null
    jwt = null
    localStorage.removeItem('jwt')
    return
  },
  async register(user) {
    const res = await fetchFromBackend('/auth/register', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    if (!res.ok) throw new Error('Registration failed')
    return this.login(user.email, user.password)
  },
  async getCurrentUser() {
    return curUser
  },
}

export const Users: UsersAPI = {
  async getUser(userId) {
    const res = await fetchFromBackend(`/users/${userId}`)
    if (!res.ok) throw new Error('User not found')
    const user = await res.json()
    await usersDB.update(user)
    return user
  },
  async getUsers() {
    const res = await fetchFromBackend('/users')
    if (!res.ok) throw new Error('Failed to fetch users')
    const users = await res.json()
    for (const user of users) {
      await usersDB.update(user)
    }
    return users
  },
  async updateUser(user) {
    const res = await fetchFromBackend(`/users/${user.user_id}`, {
      method: 'PUT',
      body: JSON.stringify(user)
    })
    if (!res.ok) throw new Error('Failed to update user')
    const updatedUser = await res.json()
    await usersDB.update(updatedUser)
    return updatedUser
  },
}

export const Messages: MessagesAPI = {
  async getMessage(messageId) {
    return messagesDB.get(messageId)
  },
  async getMessages() {
    return messagesDB.getAll()
  },
  async getMessagesInvolvingUser(userId) {
    const all = await messagesDB.getAll()
    return all.filter((m) => m.receiver_id === userId || m.sender_id === userId)
  },
  async sendMessage(message) {
    // FIXME: when there is a backend, make sure backend is setting the ulid -- creation should always send to backend, get result from backend, then store that in local db with ulid from backend
    const newMessage = {
      ...message,
      message_id: ulid(),
      sent_at: curEpoch(),
    }
    await messagesDB.create(newMessage)
    return newMessage
  },
}

export const Reviews: ReviewsAPI = {
  async getReview(reviewId) {
    return reviewsDB.get(reviewId)
  },
  async getReviews() {
    return reviewsDB.getAll()
  },
  async getReviewsForUser(userId) {
    const all = await reviewsDB.getAll()
    return all.filter((r) => r.reviewee_id === userId)
  },
  async getReviewsByUser(userId) {
    const all = await reviewsDB.getAll()
    return all.filter((r) => r.reviewer_id === userId)
  },
  async getAverageRatingForUser(userId) {
    const userReviews = await this.getReviewsForUser(userId)
    if (!userReviews.length) return 0
    return (
      userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length
    )
  },
  async createReview(review) {
    // FIXME: when there is a backend, make sure backend is setting the ulid -- creation should always send to backend, get result from backend, then store that in local db with ulid from backend
    const newReview = {
      ...review,
      review_id: ulid(),
      created_at: curEpoch(),
    }
    await reviewsDB.create(newReview)
    return newReview
  },
  async updateReview(review) {
    await reviewsDB.update(review)
    return review
  },
  async deleteReview(reviewId) {
    return reviewsDB.delete(reviewId)
  },
}

export const Listings: ListingsAPI = {
  async getListing(listingId) {
    return listingsDB.get(listingId)
  },
  async getListings() {
    return listingsDB.getAll()
  },
  async getListingsFromUser(userId) {
    const all = await listingsDB.getAll()
    return all.filter((l) => l.seller_id === userId)
  },
  async createListing(listing) {
    // FIXME: when there is a backend, make sure backend is setting the ulid -- creation should always send to backend, get result from backend, then store that in local db with ulid from backend
    const newListing = {
      ...listing,
      listing_id: ulid(),
      created_at: curEpoch(),
    }
    await listingsDB.create(newListing)
    return newListing
  },
  async updateListing(listing) {
    const newListing = {
      ...listing,
      updated_at: curEpoch(),
    }
    await listingsDB.update(newListing)
    return newListing
  },
  async deleteListing(listingId) {
    return listingsDB.delete(listingId)
  },
  async saveListing(listingId) {
    await savedListingsDB.create({
      listing_id: listingId,
      user_id: curUser!.user_id,
      saved_at: curEpoch(),
    })
  },
  async unsaveListing(listingId) {
    await savedListingsDB.delete(listingId)
  },
}
