"use client";

import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { LoadingComponent } from "@/components";
import { useMovieAccountStates, useMovieCredits, useMovieDetail } from "@/queries/movie.query";
import { MovieInfoSection, ReviewSection } from "./components";

export default function MoviesDetailPage() {
  const params = useParams();
  const movieId = Number(params.id);

  const {
    data: movieData,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useMovieDetail(movieId);

  const {
    data: creditData,
    isLoading: isCreditLoading,
    isError: isCreditError,
  } = useMovieCredits(movieId);

  const {
    data: movieAccountStates,
    isLoading: isMovieAccountStatesLoading,
    isError: isMovieAccountStatesError,
  } = useMovieAccountStates(movieId);

  if (isMovieLoading || isCreditLoading || isMovieAccountStatesLoading)
    return <LoadingComponent label="로딩 중 ... " isIndeterminate />;

  if (isMovieError || isCreditError || isMovieAccountStatesError)
    toast.error("데이터를 불러오는 중 오류가 발생했습니다!", { duration: 3000 });

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-8 py-8">
      <MovieInfoSection
        movieData={movieData}
        creditData={creditData}
        movieAccountStates={movieAccountStates}
      />
      <ReviewSection movieId={movieId} />
    </main>
  );
}
