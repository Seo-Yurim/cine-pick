import { Suspense } from "react";
import MovieDetailClient from "./movie-detail-client";

export const revalidate = 60;

const headers = {
  "Content-Type": "application/json",
  Authorization:
    process.env.NEXT_PUBLIC_TMDB_API_KEY?.startsWith("Bearer ")
      ? process.env.NEXT_PUBLIC_TMDB_API_KEY
      : `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY ?? ""}`,
};

async function movieDetailData(movieId: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, {
    headers,
    next: { revalidate: 3600, tags: [`movie:${movieId}`] },
  });
  if (!res.ok) throw new Error("Failed to fetch movie detail");
  return res.json();
}

async function movieCreditsData(movieId: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`, {
    headers,
    next: { revalidate: 3600, tags: [`movieCredits:${movieId}`] },
  });
  if (!res.ok) throw new Error("Failed to fetch movie credits");
  return res.json();
}

async function MovieDetailSection({ id }: { id: string }) {
  const [movieDetail, movieCredits] = await Promise.all([
    movieDetailData(id),
    movieCreditsData(id),
  ]);

  return <MovieDetailClient movieDetail={movieDetail} movieCredits={movieCredits} />;
}

export default async function MoviesDetailPage({params,}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense>
      <MovieDetailSection id={id} />
    </Suspense>
  );
}
