import { DBSchema } from 'idb'

type User = {
  user_id: string // ulid, primary key
  username: string // unique
  first_name: string
  last_name: string
  email: string // unique
  reward_points: number // positive int
  profile_img: string // base64 img string
  verifications: string[]
}
type Message = {
  message_id: string // ulid, primary key
  sender_id: string // foreign key: user_id
  receiver_id: string // foreign key: user_id
  message: string
  sent_at: string // epoch as string
}
type Review = {
  review_id: string // ulid, primary key
  reviewer_id: string // foreign key: user_id
  reviewee_id: string // foreign key: user_id
  reviewer_is_buyer: boolean
  rating: number
  message: string
  created_at: string // epoch as string
}
type Listing = {
  listing_id: string // ulid, primary key
  seller_id: string // foreign key: user_id
  title: string
  description: string
  price: number
  quality: string
  tags: string[]
  location_name: string
  location_lat: number
  location_long: number
  location_radius: number
  images: string[] // array of base64 image strings
  created_at: string // epoch as string
  updated_at: string // epoch as string
}
type SavedListing = {
  listing_id: string // foreign key: listing_id
  user_id: string // foreign key: user_id
  saved_at: string // epoch as string
}

interface LocalDB extends DBSchema {
  users: {
    key: string // user_id
    value: User
  }
  messages: {
    key: string // message_id
    value: Message
  }
  reviews: {
    key: string // review_id
    value: Review
  }
  listings: {
    key: string // listing_id
    value: Listing
  }
  savedListings: {
    key: string // listing_id -- foreign id
    value: SavedListing
  }
}

type ObjStore = 'users' | 'messages' | 'reviews' | 'listings' | 'savedListings'
type ObjType = User | Message | Review | Listing | SavedListing

interface dbInterface<T> {
  create: (data: T) => Promise<string>
  get: (id: string) => Promise<T>
  getAll: () => Promise<T[]>
  update: (data: T) => Promise<void>
  delete: (id: string) => Promise<void>
}

export interface AuthAPI {
  login(email: string): Promise<User>
  logout(): Promise<void>
  register(user: User): Promise<User>
  getCurrentUser(): Promise<User | null>
}

export interface UsersAPI {
  getUser(userId: string): Promise<User>
  getUsers(): Promise<User[]>
  updateUser(user: User): Promise<User>
}

export interface MessagesAPI {
  getMessage(messageId: string): Promise<Message>
  getMessages(): Promise<Message[]>
  getMessagesInvolvingUser(userId: string): Promise<Message[]>
  sendMessage(message: Message): Promise<Message>
}

export interface ReviewsAPI {
  getReview(reviewId: string): Promise<Review>
  getReviews(): Promise<Review[]>
  getReviewsForUser(userId: string): Promise<Review[]>
  getReviewsByUser(userId: string): Promise<Review[]>
  getAverageRatingForUser(userId: string): Promise<number>
  createReview(review: Review): Promise<Review>
  updateReview(review: Review): Promise<Review>
  deleteReview(reviewId: string): Promise<void>
}

export interface ListingsAPI {
  getListing(listingId: string): Promise<Listing>
  getListings(): Promise<Listing[]>
  getListingsFromUser(userId: string): Promise<Listing[]>
  createListing(listing: Listing): Promise<Listing>
  updateListing(listing: Listing): Promise<Listing>
  deleteListing(listingId: string): Promise<void>
  saveListing(listingId: string): Promise<void>
  unsaveListing(listingId: string): Promise<void>
}

export type {
  LocalDB,
  ObjStore,
  ObjType,
  User,
  Message,
  Review,
  Listing,
  SavedListing,
  dbInterface,
}
