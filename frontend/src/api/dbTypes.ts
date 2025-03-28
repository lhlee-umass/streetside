import { DBSchema } from 'idb'

type User = {
  user_id: number // ulid, primary key
  username: string // unique
  first_name: string
  last_name: string
  email: string // unique
  reward_points: number // positive int
  profile_img: string // base64 img string
  verifications: string[]
}
type Message = {
  message_id: number // ulid, primary key
  sender_id: number // foreign key: user_id
  receiver_id: number // foreign key: user_id
  message: string
  sent_at: string // epoch as string
}
type Review = {
  review_id: number // ulid, primary key
  reviewer_id: number // foreign key: user_id
  reviewee_id: number // foreign key: user_id
  reviewer_is_buyer: boolean
  rating: number
  message: string
  created_at: string // epoch as string
}
type Listing = {
  listing_id: number // ulid, primary key
  seller_id: number // foreign key: user_id
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

interface LocalDB extends DBSchema {
  users: {
    key: number // user_id
    value: User
  }
  messages: {
    key: number // message_id
    value: Message
  }
  reviews: {
    key: number // review_id
    value: Review
  }
  listings: {
    key: number // listing_id
    value: Listing
  }
}

export type { LocalDB, User, Message, Review, Listing }
