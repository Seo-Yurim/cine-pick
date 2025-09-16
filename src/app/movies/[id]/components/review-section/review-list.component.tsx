"use client";

import { useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LocalReview } from "@/types/movie.type";
import { ButtonComponent } from "@/components";
import { RatingComponent } from "@/components/rating.component";
import { useAuth } from "@/hooks/useAuth";
import { useLocalReviews } from "@/hooks/useLocalReview";
import { useDeleteRating } from "@/queries/movie.query";
import { ReviewFormComponent } from "./review-form.component";

export function ReviewListComponent({ movieId }: { movieId: number }) {
  const { accountId } = useAuth();
  const { getAllReviews, deleteReview } = useLocalReviews(movieId);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<LocalReview | null>(null);

  const reviews = getAllReviews();
  const deleteRating = useDeleteRating();

  const handleEdit = (review: LocalReview) => {
    setEditingReview(review);
    setIsFormOpen(true);
  };

  const handleDelete = (reviewId: string) => {
    if (!confirm("리뷰와 평점을 삭제하시겠습니까?")) return;

    deleteReview(reviewId);

    deleteRating.mutate(
      { movieId },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  };

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
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-background">
                  <IoPersonCircleSharp className="h-8 w-8" />
                  <p>{review.author}</p>
                </div>
                <RatingComponent type="show" defaultValue={Number(review.rating)} />
              </div>
              {review.account_id === accountId && (
                <div className="flex items-center gap-4">
                  <ButtonComponent onClick={() => handleEdit(review)}>수정</ButtonComponent>
                  <ButtonComponent onClick={() => handleDelete(review.id)}>삭제</ButtonComponent>
                </div>
              )}
            </div>
            <div className="rounded-xl bg-white/20 p-4">
              <p className="text-lg">{review.content}</p>
            </div>
          </div>
        ))
      )}

      {isFormOpen && editingReview && (
        <ReviewFormComponent
          isOpen={isFormOpen}
          movieId={movieId}
          onClose={() => {
            setIsFormOpen(false);
            setEditingReview(null);
          }}
          isEditing={true}
          reviewId={editingReview.id}
          defaultContent={editingReview.content}
          defaultRating={Number(editingReview.rating)}
        />
      )}
    </div>
  );
}
