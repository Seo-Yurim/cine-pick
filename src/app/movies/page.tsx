import { Suspense } from "react";
import MoviesClient from "./movies-client";

async function genresData() {
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=ko`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
    },
  });

  return res.json();
}

async function moviesData() {
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?language=ko`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
    },
  });

  return res.json();
}

export default async function MoviesPage() {
  const genres = await genresData();
  const movies = await moviesData();

  return (
    <Suspense>
      <MoviesClient genres={genres} initialMovies={movies} />;
    </Suspense>
  );
}
