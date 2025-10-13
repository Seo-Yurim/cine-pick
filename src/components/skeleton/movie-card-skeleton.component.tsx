"use client";

import { SkeletonBox } from "./skeleton.component";

export function MovieCardSkeletonComponent() {
  return (
    <div className="relative flex aspect-[2/3] h-full w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-lg">
      {/* 포스터 영역 */}
      <SkeletonBox height="100%" className="aspect-[3/4] min-w-[200px]" />

      {/* 텍스트 정보 영역 */}
      <div className="flex flex-col gap-1">
        {/* 제목 + 날짜 */}
        <div className="flex w-full justify-between gap-4">
          <SkeletonBox height="24px" width="66.666667%" />
          <SkeletonBox height="16px" width="25%" />
        </div>

        {/* 장르 */}
        <SkeletonBox height="14px" width="64px" />
      </div>
    </div>
  );
}
