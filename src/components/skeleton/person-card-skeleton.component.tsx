import { SkeletonBox } from "./skeleton.component";

export function PersonCardSkeletonComponent() {
  return (
    <div className="flex aspect-[2/3] h-full w-full flex-col items-center gap-4">
      <SkeletonBox
        height="400px"
        className="aspect-[3/4] w-full animate-pulse rounded-xl bg-text-bg"
      />
      <div className="flex flex-col items-center gap-2">
        <SkeletonBox height="24px" width="120px" />
        <SkeletonBox height="24px" width="160px" />
      </div>
    </div>
  );
}
