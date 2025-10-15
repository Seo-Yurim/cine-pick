import { Suspense } from "react";
import { getAvgRating } from "@/utils/avg-rating.util";
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

async function movieReviewData() {
  const res = await fetch(`http://localhost:3001/reviews`);

  return res.json();
}

export default async function MoviesDetailPage({ params }: { params: { id: number } }) {
  const movieId = params.id;

  const movieDetail = await movieDetailData(movieId);
  const movieCredits = await movieCreditsData(movieId);
  const movieReviews = await movieReviewData();

  const ratingAvg = getAvgRating(movieId, movieReviews);

  return (
    <Suspense>
      <MovieDetailClient
        movieDetail={movieDetail}
        movieCredits={movieCredits}
        movieReviews={movieReviews}
        ratingAvg={ratingAvg}
      />
    </Suspense>
  );
}
