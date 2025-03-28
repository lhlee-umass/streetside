import usersData from './mock-data/users.json'
import messagesData from './mock-data/messages.json'
import reviewsData from './mock-data/reviews.json'
import listingsData from './mock-data/listings.json'

import { User, Message, Review, Listing, LocalDB } from './types'
import { IDBPDatabase } from 'idb'

/**
 * Initializes the mock data from JSON files
 * @returns An object containing all the mock data
 */
export function initializeMockData(db: IDBPDatabase<LocalDB>): void {
  // // Process users data
  // const users: User[] = usersData.map(user => ({
  //   ...user,
  //   // Add any processing needed
  // })) as unknown as User[];

  // // Process messages data
  // const messages: Message[] = messagesData.map(message => ({
  //   ...message,
  // })) as unknown as Message[];

  // // Process reviews data
  // const reviews: Review[] = reviewsData.map(review => ({
  //   ...review,
  // })) as unknown as Review[];

  // // Process listings data (if any)
  // const listings: Listing[] = listingsData.map(listing => ({
  //   ...listing,
  //   // Add any processing needed
  // })) as unknown as Listing[];

  const users: User[] = usersData as unknown as User[]
  const messages: Message[] = messagesData as unknown as Message[]
  const reviews: Review[] = reviewsData as unknown as Review[]
  const listings: Listing[] = listingsData as unknown as Listing[]

  // Add users to the database
  const userStore = db.transaction('users', 'readwrite').objectStore('users')
  users.forEach(async (user) => {
    await userStore.put(user)
  })

  // Add messages to the database
  const messageStore = db
    .transaction('messages', 'readwrite')
    .objectStore('messages')
  messages.forEach(async (message) => {
    await messageStore.put(message)
  })

  // Add reviews to the database
  const reviewStore = db
    .transaction('reviews', 'readwrite')
    .objectStore('reviews')
  reviews.forEach(async (review) => {
    await reviewStore.put(review)
  })

  // Add listings to the database
  const listingStore = db
    .transaction('listings', 'readwrite')
    .objectStore('listings')
  listings.forEach(async (listing) => {
    await listingStore.put(listing)
  })
}
