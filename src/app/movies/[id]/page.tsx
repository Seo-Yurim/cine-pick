"use client";

import { getAvgRating } from "@/utils/avg-rating.util";
import { useParams } from "next/navigation";
import { useMovieCredits, useMovieDetail } from "@/queries/movie.query";
import { useGetReviews } from "@/queries/reviews.query";
import { MovieInfoSection, ReviewSection } from "./components";

export default function MoviesDetailPage() {
  const params = useParams();
  const movieId = Number(params.id);

  const { data: movieData } = useMovieDetail(movieId);
  const { data: creditData } = useMovieCredits(movieId);
  const { data: reviewData } = useGetReviews();

  const movieDetail = movieData ?? {};
  const creditList = creditData ?? [];
  const reviewList = reviewData ?? [];

  const avg = getAvgRating(movieId, reviewList);

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-8 py-8">
      <MovieInfoSection movieData={movieDetail} creditData={creditList} rating={avg} />
      <ReviewSection reviewData={reviewList} movieId={movieId} />
    </main>
  );
}
