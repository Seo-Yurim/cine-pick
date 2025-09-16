"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineRateReview } from "react-icons/md";
import { MovieGenres } from "@/types/movie.type";
import {
  ButtonComponent,
  LoadingComponent,
  LoginRequiredModalComponent,
  ModalComponent,
  RatingComponent,
} from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { useMovieAccountStates, useMovieCredits, useMovieDetail } from "@/queries/movie.query";
import { PersonListComponent, ReviewFormComponent, ReviewListComponent } from "./components";

const statusMapping: Record<string, string> = {
  Rumored: "제작 미정",
  Planned: "제작 예정",
  "In Production": "제작 진행 중",
  "Post Production": "편집 및 후반 작업 진행 중",
  Released: "공식 개봉",
  Canceled: "제작 취소",
};

export default function MoviesDetailPage() {
  const params = useParams();
  const movieId = params.id as string;

  const { requireLogin, isLoginModalOpen, closeLoginModal } = useAuth();
  const [isReviewFormOpen, setIsReviewFormOpen] = useState<boolean>(false);

  const {
    data: movieData,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useMovieDetail(movieId as string);

  const {
    data: creditData,
    isLoading: isCreditLoading,
    isError: isCreditError,
  } = useMovieCredits(movieId as string);

  const {
    data: movieAccountStates,
    isLoading: isMovieAccountStatesLoading,
    isError: isMovieAccountStatesError,
  } = useMovieAccountStates(movieId);

  if (isMovieLoading || isCreditLoading || isMovieAccountStatesLoading)
    return <LoadingComponent label="로딩 중 ... " isIndeterminate />;

  if (isMovieError || isCreditError || isMovieAccountStatesError)
    toast.error("데이터를 불러오는 중 오류가 발생했습니다!", { duration: 3000 });

  const moviePosterUrl = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : "/default.svg";

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-8 py-8">
      <section className="flex w-full flex-col gap-8">
        <div className="flex items-center gap-8">
          <h1 className="text-nowrap text-2xl font-bold">{movieData.title}</h1>
          <div className="w-full border-b" />
        </div>

        <div className="flex min-w-0 justify-between gap-8 max-lg:flex-col max-lg:items-center">
          <div className="relative aspect-[3/4] w-full min-w-[350px] max-w-[624px] shrink-0">
            <Image
              src={moviePosterUrl}
              className="absolute h-full w-full rounded-xl object-contain"
              fill
              priority
              alt={`${movieData.title} 포스터`}
              sizes="624px"
            />
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-8">
            <p>{movieData.overview}</p>
            <div className="flex items-center gap-4">
              <p>{movieData.release_date}</p>
              <div className="flex items-center gap-2">
                {movieData.genres.map((genre: MovieGenres) => (
                  <p key={genre.id}>{genre.name}</p>
                ))}
              </div>
              <p>{movieData.runtime}</p>
              <p>{statusMapping[movieData.status]}</p>
              <div className="flex items-center gap-4">
                <p>내가 준 평점</p>
                <RatingComponent type="show" defaultValue={movieAccountStates.rated.value} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <PersonListComponent type="cast" creditData={creditData.cast} />
              <PersonListComponent type="crew" creditData={creditData.crew} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 rounded-xl bg-text-bg p-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MdOutlineRateReview className="h-8 w-8" />
            <h2 className="text-xl font-semibold">리뷰</h2>
          </div>
          <ButtonComponent onClick={() => requireLogin(() => setIsReviewFormOpen(true))}>
            리뷰 작성하기
          </ButtonComponent>
        </div>
        <ReviewListComponent movieId={movieId} />
      </section>

      <ModalComponent isOpen={isReviewFormOpen} onClose={() => setIsReviewFormOpen(false)}>
        <ReviewFormComponent movieId={movieId} onClose={() => setIsReviewFormOpen(false)} />
      </ModalComponent>
      <LoginRequiredModalComponent isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </main>
  );
}
