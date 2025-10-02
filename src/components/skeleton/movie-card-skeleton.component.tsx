export function MovieCardSkeletonComponent() {
  return (
    <div className="relative flex aspect-[2/3] h-full w-full flex-col gap-4 rounded-xl bg-white p-4 shadow-lg">
      {/* 포스터 영역 */}
      <div className="relative aspect-[3/4] w-full min-w-[200px] animate-pulse">
        <div className="absolute h-full w-full rounded-xl bg-gray-300" />
      </div>

      {/* 텍스트 정보 영역 */}
      <div className="flex flex-col gap-2">
        {/* 제목 + 날짜 */}
        <div className="flex w-full justify-between gap-4">
          <div className="h-6 w-2/3 animate-pulse rounded bg-gray-300" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
        </div>

        {/* 장르 뱃지들 */}
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-6 w-16 animate-pulse rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>

      {/* 호버 시 보이는 줄거리 영역 */}
      <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col overflow-hidden rounded-xl border bg-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
          <div className="flex items-center gap-4 pb-4">
            <div className="h-6 w-24 animate-pulse rounded bg-gray-300" />
            <div className="flex-1 border-b" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
            <div className="h-4 w-[90%] animate-pulse rounded bg-gray-300" />
            <div className="h-4 w-[80%] animate-pulse rounded bg-gray-300" />
            <div className="h-4 w-[60%] animate-pulse rounded bg-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-4 border-t bg-gray-100 p-4">
          <div className="h-12 w-full animate-pulse rounded bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
