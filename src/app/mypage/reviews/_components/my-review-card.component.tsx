import { useEffect, useRef, useState } from "react";
import { ReviewItem } from "@/types/reviews.type";
import { useAuthStore } from "@/stores/auth.store";
import { useMovieDetail } from "@/queries/movie.query";
import { useDeleteReview, usePatchReview } from "@/queries/reviews.query";
import { ButtonComponent, MovieCardComponent, RatingComponent } from "@/components";

interface MyReviewCardProps {
  movieId: number;
  reviewList: ReviewItem[];
}

export function MyReviewCard({ movieId, reviewList }: MyReviewCardProps) {
  const { user } = useAuthStore();
  const userId = user?.id as string;
  const name = user?.name as string;
  const username = user?.username as string;

  const filteredReviewList = reviewList.filter((review) => review.movieId === movieId);
  const review = filteredReviewList[0];

  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review.rating);
  const [editContent, setEditContent] = useState(review.content);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const editReview = usePatchReview();
  const deleteReview = useDeleteReview();
  const { data } = useMovieDetail(movieId);
  const movieDetail = data ?? {};

  const handleSave = () => {
    const reviewData = {
      movieId,
      userId,
      rating: editRating,
      content: editContent,
      createdAt: new Date().toISOString(),
      user: {
        name,
        username,
      },
    };

    editReview.mutate({ reviewId: review.id, reviewData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditRating(review.rating);
    setEditContent(review.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteReview.mutate({ reviewId: review.id });
  };

  return (
    <div className="flex gap-8 rounded-xl bg-text-bg p-8">
      <div className="w-full max-w-[300px]">
        <MovieCardComponent movie={movieDetail} genres={movieDetail.genres} />
      </div>

      <div className="flex w-full flex-col justify-between gap-12 py-4">
        {/* 평점 */}
        <div className="flex items-center gap-4">
          <RatingComponent
            type={isEditing ? "select" : "show"}
            defaultValue={isEditing ? editRating : review.rating}
            rating={isEditing ? editRating : review.rating}
            setRating={isEditing ? setEditRating : undefined}
          />
          <p className="text-nowrap text-lg font-semibold">
            {isEditing ? `${editRating}점` : `${review.rating}점`}
          </p>
        </div>

        {/* 리뷰 내용 */}
        <div className="flex h-full flex-col gap-4">
          <p className="text-nowrap text-xl font-bold">작성한 내용</p>

          {isEditing ? (
            <textarea
              ref={textareaRef}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="h-full resize-none rounded-xl bg-foreground/20 p-8 text-lg focus:outline-point-color"
            />
          ) : (
            <p className="h-full rounded-xl bg-foreground/20 p-8 text-lg font-medium">
              {review.content}
            </p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex items-center gap-4">
          {isEditing ? (
            <>
              <ButtonComponent
                onClick={handleSave}
                className="flex-1 rounded-xl bg-point-color hover:bg-point-color/50"
              >
                저장
              </ButtonComponent>
              <ButtonComponent
                onClick={handleCancel}
                className="flex-1 rounded-xl bg-white/30 hover:bg-white/10"
              >
                취소
              </ButtonComponent>
            </>
          ) : (
            <>
              <ButtonComponent
                onClick={() => setIsEditing(true)}
                className="flex-1 rounded-xl bg-point-color hover:bg-point-color/50"
              >
                수정
              </ButtonComponent>
              <ButtonComponent
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-white/30 hover:bg-white/10"
              >
                삭제
              </ButtonComponent>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
