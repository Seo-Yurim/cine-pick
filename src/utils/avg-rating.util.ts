import { ReviewItem } from "@/types/reviews.type";

export function getAvgRating(reviewList: ReviewItem[]): number {
  const sum = reviewList?.reduce((total, curr) => total + curr.rating, 0);

  return reviewList?.length > 0 ? Number((sum / reviewList?.length).toFixed(1)) : 0;
}
