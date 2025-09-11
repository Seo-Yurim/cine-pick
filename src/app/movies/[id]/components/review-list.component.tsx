"use client";

import { useLocalReviewList } from "@/hooks/useLocalReview";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RatingComponent } from "./rating.component";

export function ReviewListComponent({ movieId }: { movieId: string }) {
  const reviews = useLocalReviewList(movieId);

  return (
    <div className="flex w-full flex-col">
      {reviews.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-xl font-medium">아직 작성된 리뷰가 없습니다.</p>
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-4 border-t p-4 last:border-y">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-background">
                <IoPersonCircleSharp className="h-8 w-8" />
                <p>{review.author}</p>
              </div>
              <RatingComponent type="show" defaultValue={Number(review.rating)} />
            </div>
            <p>{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
