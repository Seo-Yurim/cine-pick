import { WatchesItem } from "@/types/watches.type";
import { useMovieDetail } from "@/queries/movie.query";
import { ButtonComponent, MovieListComponent } from "@/components";

interface WatchedListProps {
  watched: WatchesItem;
  onDelete: (watched: WatchesItem) => void;
}

export function WatchedListComponent({ watched, onDelete }: WatchedListProps) {
  const { data, isLoading } = useMovieDetail(watched.movieId);
  const movieDetail = data ?? {};

  return (
    <div className="flex items-center gap-4">
      <MovieListComponent movie={movieDetail} genres={movieDetail.genres} isLoading={isLoading} />
      <ButtonComponent
        onClick={() => onDelete(watched)}
        className="rounded-xl bg-text-bg hover:bg-white/30"
      >
        삭제
      </ButtonComponent>
    </div>
  );
}
