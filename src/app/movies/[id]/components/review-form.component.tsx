import { ButtonComponent, LoadingComponent } from "@/components";
import { useAccount, useAccountDetail } from "@/queries/account.query";
import { usePostRating } from "@/queries/movie.query";
import { useState } from "react";
import toast from "react-hot-toast";
import { RatingComponent } from "./rating.component";

export function ReviewFormComponent({ movieId }: { movieId: string }) {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const sendRating = usePostRating();

  const { data: accountData, isLoading: isAccountLoading, isError: isAccountError } = useAccount();

  if (isAccountLoading) return <LoadingComponent />;
  if (isAccountError) toast.error("사용자 정보를 불러오는 중 오류가 발생했습니다.");

  const handleSendReview = async () => {
    const stored = JSON.parse(localStorage.getItem("allReviews") || "{}");

    const alreadyReviewed = stored[movieId]?.some(
      (review: any) => review.author === accountData.username,
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

    sendRating.mutate({ movieId, value: rating.toFixed(1) });
  };

  console.log(reviewText, rating.toFixed(1));

  return (
    <div className="flex h-fit flex-1 flex-col gap-4 rounded-xl bg-white p-4 shadow-lg">
      <h3 className="text-background">리뷰 작성하기</h3>
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
