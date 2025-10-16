import { ReviewItem } from "@/types/reviews.type";
import { get, patch, post, remove } from "./method";

// 리뷰 목록
export async function getReivews(movieId: number) {
  const res = await get(`/reviews?movieId=${movieId}`);
  return res.data;
}

// 내가 쓴 리뷰 목록
export async function getMyReviews(userId: string) {
  const res = await get(`/reviews?userId=${userId}`);
  return res.data;
}

// 리뷰 상세 정보
export async function getReviewDetail(reviewId: string) {
  const res = await get(`/reviews/${reviewId}`);
  return res.data;
}

// 리뷰 작성
export async function postReview(reviewData: ReviewItem) {
  const res = await post("/reviews", reviewData);
  return res.data;
}

// 리뷰 수정
export async function patchReview(reviewId: string, reviewData: Omit<ReviewItem, "id" | "user">) {
  const res = await patch(`/reviews/${reviewId}`, reviewData);
  return res.data;
}

// 리뷰 삭제
export async function deleteReview(reviewId: string) {
  const res = await remove(`/reviews/${reviewId}`);
  return res.data;
}
