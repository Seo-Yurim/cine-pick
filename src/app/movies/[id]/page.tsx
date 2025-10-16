import MovieDetailClient from "./movie-detail-client";

async function movieDetailData(movieId: number) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
    },
  });

  return res.json();
}

async function movieCreditsData(movieId: number) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
    },
  });

  return res.json();
}

export default async function MoviesDetailPage({ params }: { params: { id: number } }) {
  const movieId = params.id;

  const movieDetail = await movieDetailData(movieId);
  const movieCredits = await movieCreditsData(movieId);

  return <MovieDetailClient movieDetail={movieDetail} movieCredits={movieCredits} />;
}
