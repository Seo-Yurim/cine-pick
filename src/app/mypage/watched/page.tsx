"use client";

import { WatchesItem } from "@/types/watches.type";
import { useAuthStore } from "@/stores/auth.store";
import { useGetWatchedList } from "@/queries/watches.query";
import { LoadingComponent } from "@/components";
import { WatchedListComponent } from "./components/watched-list.component";

export default function WatchedPage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const {
    data: watchedList,
    isLoading: isWatchedListLoading,
    isError: isWatchedListError,
  } = useGetWatchedList(userId);

  if (isWatchedListLoading) return <LoadingComponent />;

  return (
    <section className="flex flex-col">
      {watchedList.map((watched: WatchesItem) => (
        <div
          key={watched.id}
          className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-between lg:grid-cols-4"
        >
          <WatchedListComponent movieId={watched.movieId} />
        </div>
      ))}
    </section>
  );
}
