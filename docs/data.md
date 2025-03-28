# Data for the Application

We will use IndexedDB for client-side storage and PostgreSQL (or some other relational DB) for server-side storage. The client-side components will request data from an API (e.g. `api.ts`) that abstracts away where the data come from. The API will eventually handle fetching fresh data from the database, fetching data from local storage when offline, updating the local storage when online, and generally fetching data. As far as the components are concerned, the API just returns data. This system will help streamline changes between milestones for where the data actually comes from.

For **Milestone 1**:
- We will use IndexedDB as a mock database.
- Mock data will be stored as `JSON` files in a the [`/frontend/src/api/mock-data/`](/frontend/src/api/mock-data/) directory.
- We will load the mock data into IndexedDB when the page is initially loaded.
- API abstraction will initialize IndexedDB on load and use it directly to respond to API calls.

For **the future**:
- We will use PostgreSQL (or some other relational DB) for server-side storage.
- We will convert IndexedDB to an offline cache for better responsiveness and offline capabilities.
- API abstraction will fetch data from the server when online and from IndexedDB when offline.
  - It will also handle syncing between online and offline storages.

# Mocking and Simulation (Milestone 1)

### Requirements (from specs):

- All data must be fabricated and maintained within the front-end.
- Store and retrieve data using in-memory JavaScript/TypeScript structures
- Use IndexedDB, LocalStorage, or SessionStorage (We're choosing IndexedDB).
- Not allowed to do any external API calls or back-end services.

## Implementation

Mock Data in [`/frontend/src/api/mock-data/`](/frontend/src/api/mock-data/):
- [`users.json`](/frontend/src/api/mock-data/users.json)
  - https://www.mockaroo.com/1d515910
- [`messages.json`](/frontend/src/api/mock-data/messages.json)
  - https://www.mockaroo.com/eb79c880
- [`reviews.json`](/frontend/src/api/mock-data/reviews.json)
  - https://www.mockaroo.com/871f1ae0
- [`listings.json`](/frontend/src/api/mock-data/listings.json)
  - https://www.mockaroo.com/b6a946d0

# Overall Schema

## Client Side

### API Interface:

```typescript
interface API {
  auth: AuthAPI;
  users: UsersAPI;
  messages: MessagesAPI;
  reviews: ReviewsAPI;
  listings: ListingsAPI;
}

interface AuthAPI {
  login(email: string): Promise<User>; // blindly logs in the user with correct email
  logout(): Promise<void>; // logs out the current user
  register(user: User): Promise<User>; // creates user
}

interface UsersAPI {
  getUser(userId: number): Promise<User>;
  getUsers(): Promise<User[]>;
  updateUser(user: User): Promise<User>;
}

interface MessagesAPI {
  getMessage(messageId: number): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getMessagesInvolvingUser(userId: number): Promise<Message[]>;
  sendMessage(message: Message): Promise<Message>;
}

interface ReviewsAPI {
  getReview(reviewId: number): Promise<Review>;
  getReviews(): Promise<Review[]>;
  getReviewsForUser(userId: number): Promise<Review[]>;
  getReviewsByUser(userId: number): Promise<Review[]>;
  getAverageRatingForUser(userId: number): Promise<number>;
  createReview(review: Review): Promise<Review>;
  updateReview(review: Review): Promise<Review>;
  deleteReview(reviewId: number): Promise<void>;
}

interface ListingsAPI {
  getListing(listingId: number): Promise<Listing>;
  getListings(): Promise<Listing[]>;
  getListingsFromUser(userId: number): Promise<Listing[]>;
  createListing(listing: Listing): Promise<Listing>;
  updateListing(listing: Listing): Promise<Listing>;
  deleteListing(listingId: number): Promise<void>;
  saveListing(listingId: number): Promise<void>;
  unsaveListing(listingId: number): Promise<void>;
}
``` 

### IndexedDB Schema:

#### Users
```
id [integer, ulid] : {
  user_id: integer [ulid, primary key],
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
```
id [integer, ulid] : {
  message_id: integer [ulid, primary key],
  sender_id: integer [foreign key],
  receiver_id: integer [foreign key],
  message: string,
  sent_at: timestamp [epoch as string]
}
```
#### Reviews
```
id [integer, ulid] : {
  review_id: integer [ulid, primary key],
  reviewer_id: integer [foreign key],
  reviewee_id: integer [foreign key],
  reviewer_is_buyer: boolean,
  rating: integer,
  message: string,
  created_at: timestamp [epoch as string]
}
```
#### Listings
```
id [integer, ulid] : {
  listing_id: integer [ulid, primary key],
  seller_id: integer [foreign key],
  title: string,
  description: string,
  price: float,
  quality: string,
  tags: array[string],
  location_name: string,
  location_lat: float,
  location_long: float,
  location_radius: float,
  images: array[blob],
  created_at: timestamp [epoch as string],
  updated_at: timestamp [epoch as string]
}
```
#### SavedListings
```
id [integer, ulid] : {
  listing_id: integer [foreign key],
  user_id: integer [foreign key],
  saved_at: timestamp [epoch as string]
}
```