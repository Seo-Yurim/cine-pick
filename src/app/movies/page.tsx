import { Suspense } from "react";
import MoviesClient from "./movies-client";

export const revalidate = 60;

const headers = {
  "Content-Type": "application/json",
  Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY?.startsWith("Bearer ")
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

function MoviesSkeleton() {
  return (
    <div className="px-2 grid grid-cols-4 gap-6 py-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="w-full aspect-[2/3] rounded-xl bg-gray-200" />
          <div className="h-4 mt-3 w-3/4 rounded bg-gray-200" />
          <div className="h-3 mt-2 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

async function _Genres() {
  const genres = await genresData();
  return <MoviesClient genres={genres} />;
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<MoviesSkeleton />}>
      <_Genres />
    </Suspense>
  );
}
