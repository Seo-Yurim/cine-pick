"use client";

import { useEffect, useState } from "react";
import { ReviewItem } from "@/types/movie.type";
import { MyReviewCard } from "./components/my-review-card.component";

type ReviewData = {
  [movieId: string]: ReviewItem[];
};

export default function MyReviewsPage() {
  const [reviewData, setReviewData] = useState<ReviewData>({});

  useEffect(() => {
    const stored = localStorage.getItem("allReviews");

    if (stored) {
      const parsed = JSON.parse(stored);
      setReviewData(parsed);
    }
  }, []);

  const reviewKeys = Object.keys(reviewData);

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <h1 className="text-2xl font-bold">내가 쓴 리뷰 목록</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        {reviewKeys.map((movieId) => (
          <div key={movieId} className="rounded-xl bg-text-bg p-12">
            <MyReviewCard movieId={movieId} reviewList={reviewData[movieId] || []} />
          </div>
        ))}
      </div>
    </main>
  );
}
