import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/user.store";
import { usePostReview } from "@/queries/reviews.query";
import { ButtonComponent, FormComponent, ModalComponent } from "@/components";
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
  isEditing = false,
  onSubmitComplete,
}: ReviewFormProps) {
  const { user } = useAuthStore();
  if (!user) {
    return toast.error("로그인이 필요합니다!");
  }

  const [rating, setRating] = useState<number>(defaultRating || 0);
  const [content, setContent] = useState<string>(defaultContent || "");

  const postReview = usePostReview();
  const handlePostReview = () => {
    const reviewData = {
      movieId,
      userId: user.id,
      rating,
      content,
      createdAt: new Date().toISOString(),
      user: {
        name: user.name,
        username: user.username,
      },
    };
    postReview.mutate(reviewData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <ModalComponent
      title={isEditing ? "리뷰 수정하기" : "리뷰 작성하기"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex max-w-[500px] flex-col gap-4">
        <FormComponent>
          <div className="flex items-center gap-8">
            <RatingComponent type="select" rating={rating} setRating={setRating} />
            <p className="text-xl font-bold">{rating}점</p>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-32 w-full rounded-xl border border-point-color p-2 text-background"
          />

          <ButtonComponent
            onClick={handlePostReview}
            className="w-full rounded-xl bg-point-color p-4 text-white"
          >
            {isEditing ? "수정 완료" : "작성 완료"}
          </ButtonComponent>
        </FormComponent>
      </div>
    </ModalComponent>
  );
}
