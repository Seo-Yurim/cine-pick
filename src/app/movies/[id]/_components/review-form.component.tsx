import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/auth.store";
import { usePostReview } from "@/queries/reviews.query";
import { ButtonComponent, ModalComponent } from "@/components";
import { RatingComponent } from "@/components/rating.component";

interface ReviewFormProps {
  isOpen: boolean;
  movieId: number;
  onClose: () => void;
}

export function ReviewFormComponent({ isOpen, movieId, onClose }: ReviewFormProps) {
  const { user } = useAuthStore();
  const userId = user?.id as string;
  const name = user?.name as string;
  const username = user?.username as string;

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const postReview = usePostReview();

  // 리뷰 작성
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

    postReview.mutate(reviewData, {
      onSuccess: () => {
        setContent("");
        setRating(0);
        onClose();
      },
    });
  };

  return (
    <ModalComponent title="리뷰 작성하기" isOpen={isOpen} onClose={onClose}>
      <div className="flex max-w-[500px] flex-col gap-4">
        <form className="flex flex-col gap-4">
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
            className="w-full rounded-xl bg-point-color p-4 text-white hover:bg-point-color/70"
          >
            작성 완료
          </ButtonComponent>
        </form>
      </div>
    </ModalComponent>
  );
}
