"use client";

import { ReviewItem } from "@/types/reviews.type";
import { useAuthStore } from "@/stores/auth.store";
import { useGetMyReviews } from "@/queries/reviews.query";
import { MyReviewCard } from "./components/my-review-card.component";

export default function MyReviewsPage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const { data: reviewList } = useGetMyReviews(userId);

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <h1 className="text-2xl font-bold">내가 쓴 리뷰 목록</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {reviewList?.length > 0 ? (
          reviewList?.map((review: ReviewItem) => (
            <div key={review.id} className="rounded-xl bg-text-bg p-12">
              <MyReviewCard movieId={review.movieId} reviewList={reviewList} />
            </div>
          ))
        ) : (
          <p>아직 작성한 리뷰가 없어요!</p>
        )}
      </div>
    </main>
  );
}
