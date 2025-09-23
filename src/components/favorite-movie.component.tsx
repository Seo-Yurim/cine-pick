import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { ButtonComponent } from "./button/button.component";

interface FavoriteMovieProps {
  defaultValue: boolean;
  movieId: number;
}

export function FavoriteMovieComponent({ defaultValue, movieId }: FavoriteMovieProps) {
  const [favorited, setFavorited] = useState<boolean>(defaultValue);

  return (
    <ButtonComponent>
      <div className="rounded-full border border-rose-600 p-2">
        {favorited ? (
          <IoIosHeart className="h-6 w-6 text-rose-600" />
        ) : (
          <IoIosHeartEmpty className="h-6 w-6 text-rose-600" />
        )}
      </div>
    </ButtonComponent>
  );
}
