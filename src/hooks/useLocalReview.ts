import { useEffect, useState } from "react";

export interface LocalReview {
  id: string;
  author: string;
  rating: string;
  content: string;
  createdAt: string;
}

export function useLocalReviewList(movieId: string) {
  const [reviews, setReviews] = useState<LocalReview[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("allReviews");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const movieReviews = parsed[movieId] || [];

    setReviews(movieReviews);
  }, [movieId]);

  return reviews;
}
