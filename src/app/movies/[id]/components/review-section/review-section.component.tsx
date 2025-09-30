import { useState } from "react";
import toast from "react-hot-toast";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { ReviewItem } from "@/types/reviews.type";
import { useModalStore } from "@/stores/modal.store";
import { useDeleteReview } from "@/queries/reviews.query";
import { ButtonComponent, LoginRequiredModalComponent, RatingComponent } from "@/components";
import { ReviewFormComponent } from "../index";

interface ReviewSectionProps {
  userId: string;
  movieId: number;
  reviewData: ReviewItem[];
}

export function ReviewSection({ userId, movieId, reviewData }: ReviewSectionProps) {
  const { modals, openModal, closeModal } = useModalStore();
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  const deleteReview = useDeleteReview();
  const handleDeleteReview = (review: ReviewItem) => {
    deleteReview.mutate({ reviewId: review.id });
  };

  const filteredReview = reviewData?.filter((review: ReviewItem) => review.movieId === movieId);

  const handleShowModal = () => {
    const alreadyWritten = filteredReview?.some((review) => review.userId === userId);
    if (alreadyWritten) return toast.error("이미 해당 영화에 리뷰를 작성했습니다.");

    if (!userId) {
      openModal("loginRequire");
    } else {
      openModal("reviewForm");
    }
  };

  return (
    <section className="flex flex-col gap-8 rounded-xl bg-text-bg p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MdOutlineRateReview className="h-8 w-8" />
          <h2 className="text-xl font-semibold">리뷰</h2>
        </div>
        <ButtonComponent
          onClick={handleShowModal}
          className="rounded-xl bg-point-color hover:bg-point-color/50"
        >
          리뷰 작성하기
        </ButtonComponent>
      </div>

      <div className="flex w-full flex-col">
        {filteredReview.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-xl font-medium">아직 작성된 리뷰가 없습니다.</p>
          </div>
        ) : (
          <div className="grid auto-cols-auto grid-cols-2 gap-8">
            {filteredReview.map((review: ReviewItem) => (
              <div key={review.id} className="flex flex-col gap-6 border-y border-t py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-background">
                      <IoPersonCircleSharp className="h-8 w-8" />
                      <p>{review.user.name}</p>
                    </div>
                    <RatingComponent type="show" defaultValue={Number(review.rating)} />
                  </div>

                  {review.userId === userId && (
                    <div className="flex items-center gap-4">
                      <ButtonComponent
                        onClick={() => {
                          setSelectedReview(review);
                          openModal("reviewForm");
                        }}
                        className="rounded-xl bg-point-color hover:bg-point-color/50"
                      >
                        수정
                      </ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDeleteReview(review)}
                        className="rounded-xl border-2 border-point-color text-point-color hover:bg-point-color/20 hover:text-white"
                      >
                        삭제
                      </ButtonComponent>
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-white/20 p-4">
                  <p className="text-lg">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewFormComponent
        isOpen={modals.reviewForm}
        movieId={movieId}
        onClose={() => {
          closeModal("reviewForm");
          setSelectedReview(null);
        }}
        defaultValue={selectedReview}
      />

      <LoginRequiredModalComponent
        isOpen={modals.loginRequire}
        onClose={() => closeModal("loginRequire")}
      />
    </section>
  );
}
