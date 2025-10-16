"use client";

import { useState } from "react";
import { ReviewItem } from "@/types/reviews.type";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { useDeleteReview, useGetMyReviews } from "@/queries/reviews.query";
import { ConfirmModalComponent } from "@/components";
import { MyReviewCard } from "./_components/my-review-card.component";

export default function MyReviewsPage() {
  const { user } = useAuthStore();
  const { modals, closeModal } = useModalStore();
  const userId = user?.id as string;

  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  const { data: reviewList } = useGetMyReviews(userId);
  const deleteReview = useDeleteReview(selectedReview?.movieId);

  const handleDelete = () => {
    if (!selectedReview) return;

    deleteReview.mutate(
      { reviewId: selectedReview.id },
      {
        onSuccess: () => {
          setSelectedReview(null);
          closeModal("confirm");
        },
      },
    );
  };

  return (
    <>
      <h1 className="text-2xl font-bold">내가 쓴 리뷰 목록</h1>
      <div className="grid grid-cols-3 gap-4">
        {reviewList?.length > 0 ? (
          reviewList?.map((review: ReviewItem) => (
            <MyReviewCard
              key={review.id}
              movieId={review.movieId}
              review={review}
              onSelect={setSelectedReview}
            />
          ))
        ) : (
          <p>아직 작성한 리뷰가 없어요!</p>
        )}
      </div>

      <ConfirmModalComponent
        isOpen={modals.confirm}
        onClose={() => {
          closeModal("confirm");
        }}
        onDelete={handleDelete}
      />
    </>
  );
}
