import { ReviewItem } from "@/types/reviews.type";

export function getAvgRating(movieId: number, reviewList: ReviewItem[]): number {
  const filteredList = reviewList.filter((review) => review.movieId === movieId);
  const sum = filteredList.reduce((total, curr) => total + curr.rating, 0);

  return filteredList.length > 0 ? Number((sum / filteredList.length).toFixed(1)) : 0;
}
