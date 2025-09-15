import { ButtonComponent, LoadingComponent } from "@/components";
import { useAccount } from "@/queries/account.query";
import { usePostRating } from "@/queries/movie.query";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReviewItem } from "@/types/movie.type";
import { RatingComponent } from "./rating.component";

export function ReviewFormComponent({
  movieId,
  onClose,
}: {
  movieId: string;
  onClose: () => void;
}) {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const sendRating = usePostRating();

  const { data: accountData, isLoading: isAccountLoading, isError: isAccountError } = useAccount();

  if (isAccountLoading) return <LoadingComponent />;
  if (isAccountError) toast.error("사용자 정보를 불러오는 중 오류가 발생했습니다.");

  const handleSendReview = async () => {
    const stored = JSON.parse(localStorage.getItem("allReviews") || "{}");

    const alreadyReviewed = stored[movieId]?.some(
      (review: ReviewItem) => review.author === accountData.username,
    );

    if (alreadyReviewed) {
      toast.error("이미 리뷰를 작성하셨습니다.");
      return;
    }

    if (rating === 0) {
      toast.error("별점을 선택해주세요!");
      return;
    }

    if (reviewText === "") {
      toast.error("리뷰를 작성해주세요!");
      return;
    }

    const newReview = {
      id: crypto.randomUUID(),
      author: accountData.username || "익명 사용자",
      rating: rating.toFixed(1),
      content: reviewText,
      createdAt: new Date().toISOString(),
    };

    const updatedReviews = {
      ...stored,
      [movieId]: [...(stored[movieId] || []), newReview],
    };

    localStorage.setItem("allReviews", JSON.stringify(updatedReviews));

    // 임시로 리뷰 작성 성공 시 새로고침 처리
    sendRating.mutate(
      { movieId, value: rating.toFixed(1) },
      {
        onSuccess: () => {
          onClose();
          window.location.reload();
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-background">리뷰 작성하기</h3>
      <RatingComponent type="select" rating={rating} setRating={setRating} />
      <div className="flex flex-col gap-4">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="h-32 rounded-xl border border-point-color p-2 text-background"
        />

        <div className="mx-auto">
          <ButtonComponent onClick={handleSendReview}>작성 완료</ButtonComponent>
        </div>
      </div>
    </div>
  );
}
