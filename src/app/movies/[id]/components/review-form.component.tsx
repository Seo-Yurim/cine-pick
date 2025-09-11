import { ButtonComponent } from "@/components";
import { RatingComponent } from "./rating.component";

export function ReviewFormComponent() {
  return (
    <div className="flex h-fit flex-1 flex-col gap-4 rounded-xl bg-white p-4 shadow-lg">
      <h3 className="text-background">리뷰 작성하기</h3>
      <RatingComponent />
      <div className="flex flex-col gap-4">
        <textarea className="h-32 rounded-xl border border-point-color" />

        <div className="mx-auto">
          <ButtonComponent>작성 완료</ButtonComponent>
        </div>
      </div>
    </div>
  );
}
