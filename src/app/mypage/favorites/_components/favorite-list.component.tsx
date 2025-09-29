import { useMovieDetail } from "@/queries/movie.query";
import { MovieCardComponent } from "@/components";

export function FavoriteListComponent({ movieId }: { movieId: number }) {
  const { data } = useMovieDetail(movieId);
  const movieDetail = data ?? {};

  return <MovieCardComponent data={movieDetail} />;
}
