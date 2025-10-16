import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdDelete, MdEdit, MdOutlineRateReview, MdSave } from "react-icons/md";
import { ReviewItem } from "@/types/reviews.type";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { useDeleteReview, usePatchReview } from "@/queries/reviews.query";
import { ButtonComponent, ConfirmModalComponent, RatingComponent } from "@/components";
import { ReviewFormComponent } from "./review-form.component";

interface ReviewSectionProps {
  userId: string;
  movieId: number;
  reviewData: ReviewItem[];
}

const iconStyle = "cursor-pointer rounded-full p-2 transition-colors duration-300";

export function ReviewListComponent({ userId, movieId, reviewData }: ReviewSectionProps) {
  const { user } = useAuthStore();
  const name = user?.name as string;
  const username = user?.username as string;

  const router = useRouter();
  const pathname = usePathname();

  const { modals, openModal, closeModal } = useModalStore();
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  const [editingReviewId, setEditingReviewId] = useState<string>("");
  const [editRating, setEditRating] = useState<number>(selectedReview?.rating || 0);
  const [editContent, setEditContent] = useState<string>(selectedReview?.content || "");
  const [contentData, setContentData] = useState(
    reviewData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 수정 시 자동으로 textarea 포커스
  useEffect(() => {
    if (editingReviewId && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingReviewId]);

  const patchReview = usePatchReview(movieId);
  const deleteReview = useDeleteReview(movieId);

  // 리뷰 저장
  const handleSave = () => {
    if (!selectedReview) return;

    setEditingReviewId(selectedReview.id);
    setSelectedReview(selectedReview);
    setEditRating(selectedReview.rating);
    setEditContent(selectedReview.content);

    const reviewData = {
      id: selectedReview.id,
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

    patchReview.mutate(
      { reviewId: selectedReview.id, reviewData },
      {
        onSuccess: () => {
          setEditingReviewId("");
          setContentData((prev) =>
            prev.map((review) => (review.id === selectedReview.id ? reviewData : review)),
          );
        },
      },
    );
  };

  // 리뷰 삭제 처리 함수
  const handleDeleteReview = () => {
    if (!selectedReview) return;

    deleteReview.mutate(
      { reviewId: selectedReview.id },
      {
        onSuccess: () => {
          setContentData((prev) => prev.filter((review) => review.id !== selectedReview.id));
          setSelectedReview(null);
          closeModal("confirm");
        },
      },
    );
  };

  // 리뷰 폼 모달 보여주기 처리 함수
  const handleShowModal = () => {
    // 미리 작성한 리뷰가 있는지 확인
    const alreadyWritten = reviewData?.some((review) => review.userId === userId);
    if (alreadyWritten) return toast.error("이미 해당 영화에 리뷰를 작성했습니다.");

    if (!userId) {
      toast.error("로그인이 필요한 서비스입니다!");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    } else {
      openModal("reviewForm");
    }
  };

  const sortData = (item: ReviewItem) => {
    setContentData((prev) =>
      [...prev, item].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
  };

  return (
    <section className="flex h-full max-h-[540px] flex-col gap-8 overflow-y-auto rounded-xl bg-text-bg p-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-point-color">
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
        {reviewData.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-xl font-medium">아직 작성된 리뷰가 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {contentData.map((review: ReviewItem) => (
              <div key={review.userId} className="flex flex-col gap-6 border-t py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-background">
                      <IoPersonCircleSharp className="h-8 w-8" />
                      <p>{review.user.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <RatingComponent
                        type={editingReviewId === review.id ? "select" : "show"}
                        defaultValue={editingReviewId === review.id ? editRating : review.rating}
                        rating={editingReviewId === review.id ? editRating : review.rating}
                        setRating={editingReviewId === review.id ? setEditRating : undefined}
                      />
                      <p className="text-nowrap text-lg font-semibold">
                        {editingReviewId === review.id ? `${editRating}점` : `${review.rating}점`}
                      </p>
                    </div>
                  </div>

                  {review.userId === userId && (
                    <div className="flex items-center justify-end gap-4">
                      <div
                        onClick={() => {
                          if (editingReviewId === review.id) {
                            setEditingReviewId("");
                            setSelectedReview(null);
                          } else {
                            setEditingReviewId(review.id);
                            setSelectedReview(review);
                            setEditRating(review.rating);
                            setEditContent(review.content);
                          }
                        }}
                        className={`${iconStyle} bg-sky-700 hover:bg-sky-500`}
                      >
                        <MdEdit size={24} />
                      </div>
                      <div
                        onClick={editingReviewId === review.id ? handleSave : () => {}}
                        className={`${
                          editingReviewId === review.id
                            ? "bg-green-700 hover:bg-green-500"
                            : "cursor-default bg-zinc-600"
                        } ${iconStyle}`}
                      >
                        <MdSave size={24} />
                      </div>
                      <div
                        onClick={() => {
                          openModal("confirm");
                          setSelectedReview(review);
                        }}
                        className={`${iconStyle} bg-rose-600 hover:bg-rose-400`}
                      >
                        <MdDelete size={24} />
                      </div>
                    </div>
                  )}
                </div>

                {editingReviewId === review.id ? (
                  <textarea
                    ref={textareaRef}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="rounded-xl bg-white/20 p-4 text-lg focus:outline-point-color"
                  />
                ) : (
                  <p className="rounded-xl bg-white/20 p-4 text-lg">{review.content}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewFormComponent
        isOpen={modals.reviewForm}
        movieId={movieId}
        onContent={sortData}
        onClose={() => {
          closeModal("reviewForm");
          setSelectedReview(null);
        }}
      />
      <ConfirmModalComponent
        isOpen={modals.confirm}
        onClose={() => closeModal("confirm")}
        onDelete={handleDeleteReview}
      />
    </section>
  );
}
