import { openDB, IDBPDatabase } from 'idb'
import { env } from '../../src/config/config'
import { initializeMockData } from './mockData'
import {
  LocalDB,
  User,
  Message,
  Review,
  Listing,
  SavedListing,
  dbInterface,
  ObjStore,
  ObjType,
} from './types'

const DB_NAME = 'streetsideDB'
const DB_VERSION = 1

let db: Promise<IDBPDatabase<LocalDB>> | null = null
let isMocking = false

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

    console.log(env.VITE_USE_MOCK_DATA)

    if (!isMocking) {
      isMocking = true
      const userCount = await database.count('users')

      // want to use mock data and have no mock data
      if (env.VITE_USE_MOCK_DATA && userCount === 0) {
        console.log('Initializing database with Mock Data...')
        initializeMockData(database)
        console.log('Database initialized with Mock Data!')
      }
    }

    return database
  } catch (err) {
    console.error('Error initializing database:', err)
    throw new Error('Failed to initialize database')
  }
}

const createCRUD = <T>(storeName: ObjStore): dbInterface<T> => {
  return {
    create: async (data: T): Promise<string> => {
      try {
        return (await getDB()).add(storeName, data as ObjType)
      } catch (err) {
        console.error(`Error adding data to ${storeName}:`, err)
        throw new Error('Failed to add data')
      }
    },
    get: async (id: string): Promise<T> => {
      try {
        return (await getDB()).get(storeName, id) as T
      } catch (err) {
        console.error(`Error retrieving data from ${storeName}:`, err)
        throw new Error('Failed to retrieve data')
      }
    },
    getAll: async (): Promise<T[]> => {
      try {
        return (await getDB()).getAll(storeName) as unknown as T[]
      } catch (err) {
        console.error(`Error retrieving all data from ${storeName}:`, err)
        throw new Error('Failed to retrieve all data')
      }
    },
    update: async (data: T): Promise<void> => {
      try {
        await (await getDB()).put(storeName, data as ObjType)
      } catch (err) {
        console.error(`Error updating data in ${storeName}:`, err)
        throw new Error('Failed to update data')
      }
    },
    delete: async (id: string): Promise<void> => {
      try {
        await (await getDB()).delete(storeName, id)
      } catch (err) {
        console.error(`Error deleting data from ${storeName}:`, err)
        throw new Error('Failed to delete data')
      }
    },
  }
}

const usersDB = createCRUD<User>('users')
const messagesDB = createCRUD<Message>('messages')
const reviewsDB = createCRUD<Review>('reviews')
const listingsDB = createCRUD<Listing>('listings')
const savedListingsDB = createCRUD<SavedListing>('savedListings')

export default getDB
export { usersDB, messagesDB, reviewsDB, listingsDB, savedListingsDB }
