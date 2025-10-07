import { SkeletonBox } from "./skeleton.component";

export function MovieInfoSkeletonComponent() {
  return (
    <div className="flex flex-col gap-4 px-16 py-12">
      <SkeletonBox height="36px" width="360px" />
      <div className="flex justify-between gap-16 max-lg:flex-col max-lg:items-center">
        {/* 포스터 스켈레톤 */}
        <div className="aspect-[3/4] w-full min-w-[350px] max-w-[620px] animate-pulse rounded-xl bg-white/20" />

        {/* 텍스트 정보 스켈레톤 */}
        <div className="flex w-full flex-col gap-8">
          <div className="flex gap-4">
            <SkeletonBox height="30px" width="100px" />
            <SkeletonBox height="30px" width="80px" />
            <SkeletonBox height="30px" width="80px" />
            <SkeletonBox height="30px" width="100px" />
          </div>
          <SkeletonBox height="200px" />
          <div className="flex gap-4">
            <SkeletonBox height="64px" width="100px" />
            <SkeletonBox height="64px" width="100px" />
            <SkeletonBox height="64px" width="100px" />
            <SkeletonBox height="64px" width="160px" />
          </div>
          <SkeletonBox height="100%" />
        </div>
      </div>
    </div>
  );
}
