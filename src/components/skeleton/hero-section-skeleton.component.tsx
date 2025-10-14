import { SkeletonBox } from "./skeleton.component";

export function HeroSectionSkeleton() {
  return (
    <div className="flex h-[700px] w-full items-stretch justify-center gap-8 bg-header-bg/50 p-16">
      {/* 왼쪽 영역 스켈레톤 */}
      <SkeletonBox height="100%" className="max-w-[400px] bg-text-bg shadow-xl" />

      {/* 오른쪽 영역 스켈레톤 */}
      <div className="flex w-full animate-custom-pulse flex-col justify-center gap-12 rounded-xl bg-text-bg/70 px-10 py-16">
        {/* 제목 + 개봉일 + 장르 */}
        <div className="flex items-center justify-between">
          {/* 제목 */}
          <SkeletonBox height="32px" width="33.3%" />

          {/* 개봉일 + 장르 */}
          <div className="flex items-center gap-4">
            {/* 개봉일 */}
            <SkeletonBox height="24px" width="96px" />

            {/* 장르 */}
            <div className="flex gap-2">
              {[...Array(3)].map((_, idx) => (
                <SkeletonBox key={idx} height="24px" width="64px" />
              ))}
            </div>
          </div>
        </div>

        {/* 줄거리 */}
        <div className="space-y-2">
          <SkeletonBox height="20px" />
          <SkeletonBox height="20px" width="90%" />
          <SkeletonBox height="20px" width="70%" />
          <SkeletonBox height="20px" width="80%" />
          <SkeletonBox height="20px" width="60%" />
        </div>

        {/* 상세보기 버튼 */}
        <SkeletonBox width="192px" height="48px" className="ml-auto" />
      </div>
    </div>
  );
}
