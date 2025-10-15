import { IoIosHeart } from "react-icons/io";
import { FavoriteMovieItem } from "@/types/users.type";
import { useMovieDetail } from "@/queries/movie.query";
import { ButtonComponent, MovieListComponent } from "@/components";

interface FavoriteListProps {
  favoriteMovie: FavoriteMovieItem;
  onDelete: (favoriteMovie: FavoriteMovieItem) => void;
}

export function FavoriteListComponent({ favoriteMovie, onDelete }: FavoriteListProps) {
  const { data, isLoading } = useMovieDetail(favoriteMovie.movieId);
  const movieDetail = data ?? {};

  return (
    <div className="flex items-center gap-4">
      <MovieListComponent movie={movieDetail} genres={movieDetail.genres} isLoading={isLoading} />
      <ButtonComponent
        onClick={() => onDelete(favoriteMovie)}
        className="group relative rounded-xl bg-text-bg hover:bg-white/30"
      >
        <IoIosHeart size={30} className="text-rose-600" />
        <div className="absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 rounded-xl bg-text-bg p-4 text-sm transition-all duration-300 group-hover:block">
          좋아요 취소
        </div>
      </ButtonComponent>
    </div>
  );
}
