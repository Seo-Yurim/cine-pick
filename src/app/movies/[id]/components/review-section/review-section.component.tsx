import { useState } from "react";
import toast from "react-hot-toast";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { ReviewItem } from "@/types/reviews.type";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { useDeleteReview } from "@/queries/reviews.query";
import { ButtonComponent, LoginRequiredModalComponent, RatingComponent } from "@/components";
import { ReviewFormComponent } from "../index";

export function ReviewSection({
  reviewData,
  movieId,
}: {
  reviewData: ReviewItem[];
  movieId: number;
}) {
  const { user } = useAuthStore();
  const { modals, openModal, closeModal } = useModalStore();
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  const deleteReview = useDeleteReview();
  const handleDeleteReview = (review: ReviewItem) => {
    if (!review) {
      toast.error("삭제할 리뷰를 선택해주세요.");
      return;
    }

    deleteReview.mutate({ reviewId: review.id });
  };

  const handleShowModal = () => {
    if (!user) {
      openModal("loginRequire");
    } else {
      openModal("reviewForm");
    }
  };

  const filteredReview = reviewData.filter((review: ReviewItem) => review.movieId === movieId);

  return (
    <section className="flex flex-col gap-8 rounded-xl bg-text-bg p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MdOutlineRateReview className="h-8 w-8" />
          <h2 className="text-xl font-semibold">리뷰</h2>
        </div>
        <ButtonComponent onClick={handleShowModal}>리뷰 작성하기</ButtonComponent>
      </div>

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

                {review.userId === user?.id && (
                  <div className="flex items-center gap-4">
                    <ButtonComponent
                      onClick={() => {
                        setSelectedReview(review);
                        openModal("reviewForm");
                      }}
                    >
                      수정
                    </ButtonComponent>
                    <ButtonComponent onClick={() => handleDeleteReview(review)}>
                      삭제
                    </ButtonComponent>
                  </div>
                )}
              </div>
              <div className="rounded-xl bg-white/20 p-4">
                <p className="text-lg">{review.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <ReviewFormComponent
        isOpen={modals.reviewForm}
        movieId={movieId}
        onClose={() => {
          closeModal("reviewForm");
          setSelectedReview(null);
        }}
        defaultContent={selectedReview?.content}
        defaultRating={selectedReview?.rating}
        reviewId={selectedReview?.id}
        isEditing={!!selectedReview}
      />

      <LoginRequiredModalComponent
        isOpen={modals.loginRequire}
        onClose={() => closeModal("loginRequire")}
      />
    </section>
  );
}
