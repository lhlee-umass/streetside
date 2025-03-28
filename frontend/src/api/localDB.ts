import { LocalDB } from './types'
import { openDB, IDBPDatabase } from 'idb'

const DB_NAME = 'streetsideDB'
const DB_VERSION = 1

let db: Promise<IDBPDatabase<LocalDB>> | null = null

async function getDB(): Promise<IDBPDatabase<LocalDB>> {
  if (!db) {
    db = initDB()
  }
  return db
}

async function initDB(): Promise<IDBPDatabase<LocalDB>> {
  try {
    console.log('Initializing database...')
    const database = await openDB<LocalDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'user_id' })
        db.createObjectStore('messages', { keyPath: 'message_id' })
        db.createObjectStore('reviews', { keyPath: 'review_id' })
        db.createObjectStore('listings', { keyPath: 'listing_id' })
        db.createObjectStore('savedListings', { keyPath: 'listing_id' })
      },
    })
    console.log('Database initialized successfully')

    // TODO: initialize with mock data depending on environment variable
    return database
  } catch (err) {
    console.error('Error initializing database:', err)
    throw new Error('Failed to initialize database')
  }
}

export default getDB
