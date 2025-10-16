"use client";

import { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { ReviewItem } from "@/types/reviews.type";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { useMovieDetail } from "@/queries/movie.query";
import { usePatchReview } from "@/queries/reviews.query";
import { MovieCardComponent, RatingComponent } from "@/components";

interface MyReviewCardProps {
  movieId: number;
  review: ReviewItem;
  onSelect: (review: ReviewItem) => void;
}

const iconStyle = "cursor-pointer rounded-full p-2 transition-colors duration-300";

export function MyReviewCard({ movieId, review, onSelect }: MyReviewCardProps) {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  const userId = user?.id as string;
  const name = user?.name as string;
  const username = user?.username as string;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editRating, setEditRating] = useState<number>(review.rating);
  const [editContent, setEditContent] = useState<string>(review.content);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 수정 시 자동으로 textarea 포커스
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const editReview = usePatchReview(movieId);

  const { data, isLoading } = useMovieDetail(movieId);
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

  return (
    <>
      <div className="test flex gap-8 rounded-xl bg-text-bg p-8">
        <div className="w-full max-w-[200px]">
          <MovieCardComponent
            movie={movieDetail}
            genres={movieDetail.genres}
            isLoading={isLoading}
          />
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
            <p className="text-nowrap text-lg font-bold">작성한 내용</p>

            {isEditing ? (
              <textarea
                ref={textareaRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="h-full resize-none rounded-xl bg-foreground/20 p-4 focus:outline-point-color"
              />
            ) : (
              <p className="h-full rounded-xl bg-foreground/20 p-4 font-medium">{review.content}</p>
            )}
          </div>

          {/* 버튼 */}
          <div className="flex items-center justify-end gap-4">
            <div
              onClick={() => setIsEditing(!isEditing)}
              className={`${iconStyle} bg-sky-700 hover:bg-sky-500`}
            >
              <MdEdit size={24} />
            </div>
            <div
              onClick={isEditing ? handleSave : () => {}}
              className={`${isEditing ? "bg-green-700 hover:bg-green-500" : "cursor-default bg-zinc-600"} ${iconStyle}`}
            >
              <MdSave size={24} />
            </div>
            <div
              onClick={() => {
                openModal("confirm");
                onSelect(review);
              }}
              className={`${iconStyle} bg-rose-600 hover:bg-rose-400`}
            >
              <MdDelete size={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
