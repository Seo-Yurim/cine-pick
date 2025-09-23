"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LocalReview } from "@/types/movie.type";
import { ReviewItem } from "@/types/reviews.type";
import { useModalStore } from "@/stores/modal.store";
import { useAuthStore } from "@/stores/user.store";
import { useGetReviews } from "@/queries/reviews.query";
import { ButtonComponent, LoadingComponent } from "@/components";
import { RatingComponent } from "@/components/rating.component";
import { ReviewFormComponent } from "./review-form.component";

export function ReviewListComponent({ movieId }: { movieId: number }) {
  const { user } = useAuthStore();
  if (!user) return toast.error("로그인이 필요합니다!");

  const { modals, openModal, closeModal } = useModalStore();
  const [editingReview, setEditingReview] = useState<LocalReview | null>(null);

  const { data: reviewList, isLoading: isReviewLoading, isError: isReviewError } = useGetReviews();
  if (isReviewLoading) return <LoadingComponent />;
  if (isReviewError) return toast.error("리뷰 목록을 불러오는 중 오류가 발생했습니다.");

  const filteredReview = reviewList.filter((review: ReviewItem) => review.movieId === movieId);

  return (
    <div className="flex w-full flex-col">
      {filteredReview.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-xl font-medium">아직 작성된 리뷰가 없습니다.</p>
        </div>
      ) : (
        filteredReview.map((review: ReviewItem) => (
          <div key={review.id} className="flex flex-col gap-4 border-t p-4 last:border-y">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-background">
                  <IoPersonCircleSharp className="h-8 w-8" />
                  <p>{review.user.name}</p>
                </div>
                <RatingComponent type="show" defaultValue={Number(review.rating)} />
              </div>
              {review.userId === user.id && (
                <div className="flex items-center gap-4">
                  <ButtonComponent>수정</ButtonComponent>
                  <ButtonComponent>삭제</ButtonComponent>
                </div>
              )}
            </div>
            <div className="rounded-xl bg-white/20 p-4">
              <p className="text-lg">{review.content}</p>
            </div>
          </div>
        ))
      )}

      {editingReview && (
        <ReviewFormComponent
          isOpen={modals.editReviewForm}
          movieId={movieId}
          onClose={() => {
            closeModal("editReviewForm");
            setEditingReview(null);
          }}
          isEditing={true}
          reviewId={editingReview.id}
          defaultContent={editingReview.content}
          defaultRating={editingReview ? Number(editingReview.rating) : 0}
        />
      )}
    </div>
  );
}
