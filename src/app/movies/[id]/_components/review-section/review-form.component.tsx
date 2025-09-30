import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ReviewItem } from "@/types/reviews.type";
import { useAuthStore } from "@/stores/auth.store";
import { usePatchReview, usePostReview } from "@/queries/reviews.query";
import { ButtonComponent, FormComponent, ModalComponent } from "@/components";
import { RatingComponent } from "@/components/rating.component";

interface ReviewFormProps {
  isOpen: boolean;
  movieId: number;
  onClose: () => void;
  defaultValue: ReviewItem | null;
}

export function ReviewFormComponent({ isOpen, movieId, onClose, defaultValue }: ReviewFormProps) {
  const { user } = useAuthStore();
  const userId = user?.id as string;
  const name = user?.name as string;
  const username = user?.username as string;

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (defaultValue) {
      setRating(defaultValue.rating || 0);
      setContent(defaultValue.content || "");
    } else {
      setRating(0);
      setContent("");
    }
  }, [defaultValue]);

  const postReview = usePostReview();
  const patchReview = usePatchReview();

  const handleSubmit = () => {
    const reviewData = {
      movieId,
      userId,
      rating,
      content,
      createdAt: new Date().toISOString(),
      user: {
        name,
        username,
      },
    };

    if (reviewData.rating === 0) return toast.error("평점을 선택해주세요!");
    if (reviewData.content === "") return toast.error("리뷰를 작성해주세요!");

    // 리뷰 수정
    if (defaultValue) {
      patchReview.mutate(
        { reviewId: defaultValue.id, reviewData },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    }

    // 리뷰 작성
    else {
      postReview.mutate(reviewData, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <ModalComponent
      title={defaultValue ? "리뷰 수정하기" : "리뷰 작성하기"}
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
            onClick={handleSubmit}
            className="w-full rounded-xl bg-point-color p-4 text-white"
          >
            {defaultValue ? "수정 완료" : "작성 완료"}
          </ButtonComponent>
        </FormComponent>
      </div>
    </ModalComponent>
  );
}
