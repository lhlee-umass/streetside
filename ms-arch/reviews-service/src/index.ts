import express, { Request, Response } from "express";
import { pino } from "pino";
import { v4 as uuidv4 } from "uuid";

const PORT = 3000;

const log = pino({ transport: { target: "pino-pretty" } });
const app = express();
app.use(express.json());

// In-memory "database" for reviews
const reviews: any[] = [];

// Get all reviews (this could be filtered by a reviewer_id or other parameters)
app.get("/", (req: Request, res: Response) => {
  res.json(reviews);
});

// Get reviews by reviewer_id
app.get("/:reviewer_id", (req: Request, res: Response) => {
  const { reviewer_id } = req.params;
  const reviewerReviews = reviews.filter(
    (review) => review.reviewer_id === reviewer_id
  );
  res.json(reviewerReviews);
});

// Create a new review
app.post("/", (req: Request, res: Response) => {
  const { reviewer_id, reviewee_id, rating, message } = req.body;

  // Validate the incoming data
  if (!reviewer_id || !reviewee_id || rating == null || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  // Create a new review and add it to the "database"
  const newReview = {
    id: uuidv4(),
    reviewer_id,
    reviewee_id,
    rating,
    message,
    created_at: Math.floor(Date.now() / 1000), // Epoch timestamp
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Update an existing review
app.put("/:review_id", (req: Request, res: Response) => {
  const { review_id } = req.params;
  const { rating, message } = req.body;

  // Find the review to update
  const reviewIndex = reviews.findIndex((review) => review.id === review_id);
  if (reviewIndex === -1) {
    return res.status(404).json({ error: "Review not found" });
  }

  // Update the review
  if (rating != null) reviews[reviewIndex].rating = rating;
  if (message) reviews[reviewIndex].message = message;

  res.json(reviews[reviewIndex]);
});

// Delete a review
app.delete("/:review_id", (req: Request, res: Response) => {
  const { review_id } = req.params;
  
  // Find the review to delete
  const reviewIndex = reviews.findIndex((review) => review.id === review_id);
  if (reviewIndex === -1) {
    return res.status(404).json({ error: "Review not found" });
  }

  // Remove the review from the array
  reviews.splice(reviewIndex, 1);
  
  res.status(204).send(); // No content to return
});

// Start the server
app.listen(PORT, () => {
  log.info(`Reviews service running on port ${PORT}`);
});
