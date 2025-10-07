import { useMovieDetail } from "@/queries/movie.query";
import { MovieCardComponent } from "@/components";

export function WatchedListComponent({ movieId }: { movieId: number }) {
  const { data } = useMovieDetail(movieId);
  const movieDetail = data ?? {};

  return <MovieCardComponent movie={movieDetail} genres={movieDetail.genres} />;
}
