export interface MovieParams {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  with_people?: string;
  primary_release_year?: string;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieGenres {
  genres: {
    id: string;
    name: string;
  }[];
}
