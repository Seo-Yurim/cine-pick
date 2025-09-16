import { useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { ButtonComponent, LoginRequiredModalComponent } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { ReviewFormComponent, ReviewListComponent } from "./index";

export function ReviewSection({ movieId }: { movieId: number }) {
  const { requireLogin, isLoginModalOpen, closeLoginModal } = useAuth();
  const [isReviewFormOpen, setIsReviewFormOpen] = useState<boolean>(false);

  return (
    <>
      <section className="flex flex-col gap-8 rounded-xl bg-text-bg p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MdOutlineRateReview className="h-8 w-8" />
            <h2 className="text-xl font-semibold">리뷰</h2>
          </div>
          <ButtonComponent onClick={() => requireLogin(() => setIsReviewFormOpen(true))}>
            리뷰 작성하기
          </ButtonComponent>
        </div>
        <ReviewListComponent movieId={movieId} />
      </section>

      <ReviewFormComponent
        isOpen={isReviewFormOpen}
        movieId={movieId}
        onClose={() => setIsReviewFormOpen(false)}
      />
      <LoginRequiredModalComponent isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
}
