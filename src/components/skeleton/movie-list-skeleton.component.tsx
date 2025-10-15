"use client";

import { SkeletonBox } from "./skeleton.component";

export function MovieListSkeleton() {
  return (
    <div className="flex w-full items-center gap-6 rounded-xl bg-text-bg p-6">
      <SkeletonBox width="150px" height="170px" className="shrink-0" />

      <div className="flex w-full flex-col justify-between gap-4">
        <div className="flex items-center gap-2">
          <SkeletonBox width="400px" height="30px" />
          <SkeletonBox width="100px" height="20px" />
        </div>

        <div className="flex flex-col gap-2">
          <SkeletonBox width="90%" height="15px" />
          <SkeletonBox width="70%" height="15px" />
          <SkeletonBox width="80%" height="15px" />
        </div>

        <div className="flex flex-wrap gap-2">
          <SkeletonBox width="80px" height="30px" />
          <SkeletonBox width="80px" height="30px" />
          <SkeletonBox width="80px" height="30px" />
        </div>
      </div>
    </div>
  );
}
