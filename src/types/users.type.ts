export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
}

export interface FavoriteMovieItem {
  id: string;
  userId: string;
  movieId: number;
  favorite: boolean;
}
