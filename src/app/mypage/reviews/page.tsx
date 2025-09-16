"use client";

import { useLocalReviews } from "@/hooks/useLocalReview";
import { MyReviewCard } from "./components/my-review-card.component";

export default function MyReviewsPage() {
  const { getAllMyReviews } = useLocalReviews("");

  const myReviews = getAllMyReviews();

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <h1 className="text-2xl font-bold">내가 쓴 리뷰 목록</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {myReviews.map((review) => (
          <div key={review.id} className="rounded-xl bg-text-bg p-12">
            <MyReviewCard movieId={review.movie_id} reviewList={myReviews} />
          </div>
        ))}
      </div>
    </main>
  );
}
