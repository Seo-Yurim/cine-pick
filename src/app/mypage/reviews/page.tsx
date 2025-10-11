"use client";

import { ReviewItem } from "@/types/reviews.type";
import { useAuthStore } from "@/stores/auth.store";
import { useGetMyReviews } from "@/queries/reviews.query";
import { MyReviewCard } from "./_components/my-review-card.component";

export default function MyReviewsPage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const { data: reviewList } = useGetMyReviews(userId);

  return (
    <>
      <h1 className="text-2xl font-bold">내가 쓴 리뷰 목록</h1>
      <div className="grid grid-cols-2 gap-4">
        {reviewList?.length > 0 ? (
          reviewList?.map((review: ReviewItem) => (
            <MyReviewCard key={review.id} movieId={review.movieId} reviewList={reviewList} />
          ))
        ) : (
          <p>아직 작성한 리뷰가 없어요!</p>
        )}
      </div>
    </>
  );
}
