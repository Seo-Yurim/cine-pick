import { useState } from "react";
import { ButtonComponent, ModalComponent } from "@/components";
import { RatingComponent } from "@/components/rating.component";

interface ReviewFormProps {
  isOpen: boolean;
  movieId: number;
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
          <ButtonComponent>{isEditing ? "수정 완료" : "작성 완료"}</ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  );
}
