import { useState } from "react";
import toast from "react-hot-toast";
import { LocalReview, ReviewItem } from "@/types/movie.type";
import { ButtonComponent, LoadingComponent, ModalComponent } from "@/components";
import { RatingComponent } from "@/components/rating.component";
import { useAccount } from "@/queries/account.query";
import { usePostRating } from "@/queries/movie.query";

interface ReviewFormProps {
  isOpen: boolean;
  movieId: string;
  onClose: () => void;
  defaultContent?: string;
  defaultRating?: number;
  reviewId?: string;
  isEditing?: boolean;
  onSubmitComplete?: () => void;
}

export function ReviewFormComponent({
  isOpen,
  movieId,
  onClose,
  defaultContent,
  defaultRating,
  reviewId,
  isEditing = false,
  onSubmitComplete,
}: ReviewFormProps) {
  const [reviewText, setReviewText] = useState<string>(defaultContent || "");
  const [rating, setRating] = useState<number>(defaultRating || 0);

  const sendRating = usePostRating();
  const { data: accountData } = useAccount();

  const handleSubmit = async () => {
    if (rating === 0) return toast.error("별점을 선택해주세요!");
    if (reviewText.trim() === "") return toast.error("리뷰를 작성해주세요!");

    const raw = localStorage.getItem("allReviews");
    const allReviews = raw ? JSON.parse(raw) : {};
    const movieReviews = allReviews[movieId] || [];

    if (isEditing) {
      const updated = movieReviews.map((review: ReviewItem) =>
        review.id === reviewId
          ? {
              ...review,
              content: reviewText,
              rating: rating.toFixed(1),
              editedAt: new Date().toISOString(),
            }
          : review,
      );

      allReviews[movieId] = updated;
      localStorage.setItem("allReviews", JSON.stringify(allReviews));
      toast.success("리뷰가 수정되었습니다.");

      sendRating.mutate({
        movieId,
        value: rating.toFixed(1),
      });
    } else {
      const alreadyReviewed = movieReviews.some(
        (review: LocalReview) => review.author === accountData?.username,
      );
      if (alreadyReviewed) return toast.error("이미 리뷰를 작성하셨습니다.");

      const newReview: LocalReview = {
        id: crypto.randomUUID(),
        account_id: localStorage.getItem("account_id")!,
        author: accountData.username,
        rating: rating.toFixed(1),
        content: reviewText,
        createdAt: new Date().toISOString(),
      };

      allReviews[movieId] = [...movieReviews, newReview];
      localStorage.setItem("allReviews", JSON.stringify(allReviews));
      toast.success("리뷰가 등록되었습니다.");
    }

    sendRating.mutate({ movieId, value: rating.toFixed(1) });

    onClose();
    onSubmitComplete?.();
    window.location.reload();
  };

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium text-background">
          {isEditing ? "리뷰 수정하기" : "리뷰 작성하기"}
        </h3>
        <RatingComponent type="select" rating={rating} setRating={setRating} />
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="h-32 rounded-xl border border-point-color p-2 text-background"
        />
        <div className="mx-auto">
          <ButtonComponent onClick={handleSubmit}>
            {isEditing ? "수정 완료" : "작성 완료"}
          </ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  );
}
