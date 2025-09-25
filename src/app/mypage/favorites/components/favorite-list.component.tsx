import { useMovieDetail } from "@/queries/movie.query";
import { LoadingComponent, MovieCardComponent } from "@/components";

export function FavoriteListComponent({ movieId }: { movieId: number }) {
  const { data, isLoading, isError } = useMovieDetail(movieId);
  if (isLoading) return <LoadingComponent />;

  return <MovieCardComponent data={data} />;
}
