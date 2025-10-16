import MoviesClient from "./movies-client";

export const revalidate = 60;

const headers = {
  "Content-Type": "application/json",
  Authorization:
    process.env.NEXT_PUBLIC_TMDB_API_KEY?.startsWith("Bearer ")
      ? process.env.NEXT_PUBLIC_TMDB_API_KEY
      : `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY ?? ""}`,
};

async function genresData() {
  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=ko", {
    headers,
    next: { revalidate: 3600, tags: ["tmdb:genres"] },
  });
  return res.json();
}

async function moviesData() {
  const res = await fetch("https://api.themoviedb.org/3/discover/movie?language=ko", {
    headers,
    next: { revalidate: 120, tags: ["tmdb:discover"] },
  });
  return res.json();
}

export default async function MoviesPage() {
  const [genres, movies] = await Promise.all([genresData(), moviesData()]);
  return <MoviesClient genres={genres} initialMovies={movies} />;
}
