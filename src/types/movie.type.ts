export interface MovieParams {
  page?: number;
  sort_by?: string;
  region?: string;
  with_genres?: string;
  with_people?: string;
  with_origin_country?: string;
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
  media_type?: string;
}

export interface MovieResponse {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieGenres {
  id: number;
  name: string;
}

export interface GenresList {
  genres: MovieGenres[];
}

export interface MovieDetailItem extends MovieItem {
  belongs_to_collection: string;
  genres: MovieGenres[];
  budget: number;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
}

export interface MovieCreditResponse {
  id: number;
  cast: MovieCast[];
  crew: MovieCrew[];
}

export interface MovieCreditItem {
  adult: boolean;
  gender: 0 | 1;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
}

export interface MovieCast extends MovieCreditItem {
  cast_id: number;
  character: string;
  order: number;
}

export interface MovieCrew extends MovieCreditItem {
  department: string;
  job: string;
}

export interface PersonItem {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface PersonMovies {
  cast: MovieItem[];
  crew: MovieItem[];
}
