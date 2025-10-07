"use client";

import { WatchesItem } from "@/types/watches.type";
import { useAuthStore } from "@/stores/auth.store";
import { useGetWatchedList } from "@/queries/watches.query";
import { WatchedListComponent } from "./_components/watched-list.component";

export default function WatchedPage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const { data: watchedList } = useGetWatchedList(userId);

  return (
    <>
      <h1 className="text-2xl font-bold">시청기록</h1>
      <div className="grid grid-cols-4 gap-4 p-4">
        {watchedList?.length > 0 ? (
          watchedList?.map((watched: WatchesItem) => (
            <WatchedListComponent key={watched.id} movieId={watched.movieId} />
          ))
        ) : (
          <p>아직 시청 기록이 없어요.</p>
        )}
      </div>
    </>
  );
}
