import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { MdOutlineRateReview } from "react-icons/md";
import { ButtonComponent, LoginRequiredModalComponent } from "@/components";
import { ReviewFormComponent, ReviewListComponent } from "../index";

export function ReviewSection({ movieId }: { movieId: number }) {
  const { sessionId } = useAuthStore();
  const { modals, openModal, closeModal } = useModalStore();

  // 수정
  const requireLogin = (callback: () => void) => {
    if (!sessionId) {
      openModal("loginRequire");
    } else {
      closeModal("loginRequire");
      callback();
    }
  };

  return (
    <>
      <section className="flex flex-col gap-8 rounded-xl bg-text-bg p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MdOutlineRateReview className="h-8 w-8" />
            <h2 className="text-xl font-semibold">리뷰</h2>
          </div>
          <ButtonComponent onClick={() => requireLogin(() => openModal("reviewForm"))}>
            리뷰 작성하기
          </ButtonComponent>
        </div>
        <ReviewListComponent movieId={movieId} />
      </section>

      <ReviewFormComponent
        isOpen={modals.reviewForm}
        movieId={movieId}
        onClose={() => closeModal("reviewForm")}
      />
      <LoginRequiredModalComponent
        isOpen={modals.loginRequire}
        onClose={() => closeModal("loginRequire")}
      />
    </>
  );
}
