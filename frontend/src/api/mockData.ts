import usersData from './mock-data/users.json'
import messagesData from './mock-data/messages.json'
import reviewsData from './mock-data/reviews.json'
import listingsData from './mock-data/listings.json'

import { User, Message, Review, Listing, LocalDB } from './types'
import { IDBPDatabase } from 'idb'

export function initializeMockData(db: IDBPDatabase<LocalDB>): void {
  const users: User[] = usersData as unknown as User[]
  const messages: Message[] = messagesData as unknown as Message[]
  const reviews: Review[] = reviewsData as unknown as Review[]
  const listings: Listing[] = listingsData as unknown as Listing[]

  const userStore = db.transaction('users', 'readwrite').objectStore('users')
  users.forEach(async (user) => {
    await userStore.put(user)
  })

  const messageStore = db
    .transaction('messages', 'readwrite')
    .objectStore('messages')
  messages.forEach(async (message) => {
    await messageStore.put(message)
  })

  const reviewStore = db
    .transaction('reviews', 'readwrite')
    .objectStore('reviews')
  reviews.forEach(async (review) => {
    await reviewStore.put(review)
  })

  const listingStore = db
    .transaction('listings', 'readwrite')
    .objectStore('listings')
  listings.forEach(async (listing) => {
    await listingStore.put(listing)
  })
}
