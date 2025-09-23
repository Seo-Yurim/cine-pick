import { MdOutlineRateReview } from "react-icons/md";
import { useModalStore } from "@/stores/modal.store";
import { ButtonComponent, LoginRequiredModalComponent } from "@/components";
import { ReviewFormComponent, ReviewListComponent } from "../index";

export function ReviewSection({ movieId }: { movieId: number }) {
  const { modals, openModal, closeModal } = useModalStore();

  return (
    <>
      <section className="flex flex-col gap-8 rounded-xl bg-text-bg p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MdOutlineRateReview className="h-8 w-8" />
            <h2 className="text-xl font-semibold">리뷰</h2>
          </div>
          <ButtonComponent>리뷰 작성하기</ButtonComponent>
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
