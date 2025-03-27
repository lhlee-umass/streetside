# Data for the Application

We will use IndexedDB for client-side storage and PostgreSQL (or some other relational DB) for server-side storage. The client-side components will request data from an API (e.g. `api.ts`) that abstracts away where the data come from. The API will eventually handle fetching fresh data from the database, fetching data from local storage when offline, updating the local storage when online, and generally fetching data. As far as the components are concerned, the API just returns data. This system will help streamline changes between milestones for where the data actually comes from.

For **Milestone 1**:
- We will use IndexedDB as a mock database.
- Mock data will be stored in a `mockData.json` file.
- We will load the mock data into IndexedDB when the page is initially loaded.
- API abstraction will initialize IndexedDB on load and use it directly to respond to API calls.

For **the future**:
- We will use PostgreSQL (or some other relational DB) for server-side storage.
- We will convert IndexedDB to an offline cache for better responsiveness and offline capabilities.
- API abstraction will fetch data from the server when online and from IndexedDB when offline.
  - It will also handle syncing between online and offline storages.

# Overall Schema

## Client Side

### API Interface:

```typescript
interface API {
  users: UsersAPI;
  messages: MessagesAPI;
  reviews: ReviewsAPI;
  listings: ListingsAPI;
}

interface UsersAPI {
  getUser(userId: number): Promise<User>;
  getUsers(): Promise<User[]>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(userId: number): Promise<void>;
}

interface MessagesAPI {
  getMessage(messageId: number): Promise<Message>;
  getMessages(): Promise<Message[]>;
  sendMessage(message: Message): Promise<Message>;
  deleteMessage(messageId: number): Promise<void>;
}

interface ReviewsAPI {
  getReview(reviewId: number): Promise<Review>;
  getReviews(): Promise<Review[]>;
  createReview(review: Review): Promise<Review>;
  updateReview(review: Review): Promise<Review>;
  deleteReview(reviewId: number): Promise<void>;
}

interface ListingsAPI {
  getListing(listingId: number): Promise<Listing>;
  getListings(): Promise<Listing[]>;
  createListing(listing: Listing): Promise<Listing>;
  updateListing(listing: Listing): Promise<Listing>;
  deleteListing(listingId: number): Promise<void>;
}
``` 

### IndexedDB Schema:

#### Users
```json
id [integer, uuid] : {
  user_id: integer [uuid, primary key],
  username: string [unique],
  first_name: string,
  last_name: string,
  email: string [unique],
  reward_points: integer,
  profile_img: blob,
  verifications: array[string]
}
```
#### Messages
```json
id [integer, uuid] : {
  message_id: integer [primary key],
  sender_id: integer [foreign key],
  receiver_id: integer [foreign key],
  message: string,
  sent_at: timestamp
}
```
#### Reviews
```json
id [integer, uuid] : {
  review_id: integer [primary key],
  reviewer_id: integer [foreign key],
  reviewee_id: integer [foreign key],
  rating: integer,
  message: string,
  created_at: timestamp
}
```
#### Listings
```json
id [integer, uuid] : {
  listing_id: integer [primary key],
  seller_id: integer [foreign key],
  title: string,
  description: string,
  price: float,
  quality: string,
  categories: array[string],
  location_name: string,
  location_lat: float,
  location_long: float,
  location_radius: float,
  images: array[blob],
  created_at: timestamp,
  updated_at: timestamp
}
```

# Mocking and Simulation (Milestone 1)

### Requirements:

- All data must be fabricated and maintained within the front-end.
- Store and retrieve data using in-memory JavaScript/TypeScript structures
- Use IndexedDB, LocalStorage, or SessionStorage (We're choosing IndexedDB).
- Not allowed to do any external API calls or back-end services.

## Implementation

