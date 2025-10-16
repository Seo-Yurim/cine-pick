import { FavoriteControlComponent } from "@/app/movies/[id]/_components";
import { FavoriteMovieItem } from "@/types/users.type";
import { useMovieDetail } from "@/queries/movie.query";
import { MovieListComponent } from "@/components";

interface FavoriteListProps {
  favoriteMovie: FavoriteMovieItem;
}

export function FavoriteListComponent({ favoriteMovie }: FavoriteListProps) {
  const { data, isLoading } = useMovieDetail(favoriteMovie.movieId);
  const movieDetail = data ?? {};

  return (
    <div className="flex items-center gap-4">
      <MovieListComponent movie={movieDetail} genres={movieDetail.genres} isLoading={isLoading} />
      <FavoriteControlComponent defaultValue={favoriteMovie} movieId={movieDetail.id} />
    </div>
  );
}
