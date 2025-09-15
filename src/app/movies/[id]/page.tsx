"use client";

import { ButtonComponent, LoadingComponent } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { useMovieAccountStates, useMovieCredits, useMovieDetail } from "@/queries/movie.query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import { MovieCast, MovieCrew, MovieGenres } from "@/types/movie.type";
import { ModalComponent } from "@/components/modal/modal.component";
import { LoginRequiredModalComponent } from "@/components/require-login.component";
import { RatingComponent } from "./components/rating.component";
import { ReviewFormComponent } from "./components/review-form.component";
import { ReviewListComponent } from "./components/review-list.component";

const statusMapping: Record<string, string> = {
  Rumored: "제작 미정",
  Planned: "제작 예정",
  "In Production": "제작 진행 중",
  "Post Production": "편집 및 후반 작업 진행 중",
  Released: "공식 개봉",
  Canceled: "제작 취소",
};

export default function MoviesDetailPage() {
  const { sessionId, requireLogin, isLoginModalOpen, closeLoginModal } = useAuth();

  const params = useParams();
  const movieId = params.id as string;
  const DATA_SIZE = 7;

  const [visibleCastCount, setVisibleCastCount] = useState<number>(DATA_SIZE);
  const [visibleCrewCount, setVisibleCrewCount] = useState<number>(DATA_SIZE);
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

  const handleLoadCastData = () => {
    setVisibleCastCount((prev) => prev + DATA_SIZE);
  };

  const handleLoadCrewData = () => {
    setVisibleCrewCount((prev) => prev + DATA_SIZE);
  };

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
              <div className="flex flex-col gap-2 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <p className="text-nowrap text-lg font-medium">출연진</p>
                  <div className="w-full border-b" />
                </div>
                <div className="flex flex-col gap-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
                  <div className="mb-4 grid w-full auto-cols-auto grid-flow-col gap-8 p-2">
                    {creditData.cast.slice(0, visibleCastCount).map((credit: MovieCast) => (
                      <Link
                        href={`/person/${credit.id}`}
                        key={credit.cast_id}
                        className="flex flex-col items-center gap-2 text-nowrap text-center transition-all duration-300 hover:scale-105"
                      >
                        <div className="relative aspect-[3/4] w-[100px] xl:w-[120px] 2xl:w-[200px]">
                          <Image
                            src={
                              credit.profile_path
                                ? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
                                : "/default.svg"
                            }
                            className="absolute h-full w-full rounded-xl object-cover"
                            fill
                            priority
                            alt={`${credit.name} 출연진`}
                            sizes="200px"
                          />
                        </div>
                        <p className="text-sm">{credit.name}</p>
                        <p className="text-xs">{credit.character} 역</p>
                      </Link>
                    ))}
                    {visibleCastCount < creditData.cast.length && (
                      <FaCircleArrowRight
                        onClick={handleLoadCastData}
                        className="my-auto h-16 w-16 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <p className="text-nowrap text-lg font-medium">제작진</p>
                  <div className="w-full border-b" />
                </div>
                <div className="flex flex-col gap-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
                  <div className="mb-4 grid w-full auto-cols-auto grid-flow-col gap-8 p-2">
                    {creditData.crew.slice(0, visibleCrewCount).map((credit: MovieCrew) => (
                      <Link
                        href={`/person/${credit.id}`}
                        key={`${credit.id} ${credit.name} ${credit.job}`}
                        className="flex flex-col items-center gap-2 text-center transition-all duration-300 hover:scale-105"
                      >
                        <div className="relative aspect-[3/4] w-[100px] xl:w-[120px] 2xl:w-[200px]">
                          <Image
                            src={
                              credit.profile_path
                                ? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
                                : "/default.svg"
                            }
                            className="absolute h-full w-full rounded-xl object-cover"
                            fill
                            priority
                            alt={`${credit.name} 제작진`}
                            sizes="200px"
                          />
                        </div>
                        <p className="text-nowrap text-sm">{credit.name}</p>
                        <p className="text-xs">{credit.job}</p>
                      </Link>
                    ))}
                    {visibleCrewCount < creditData.crew.length && (
                      <FaCircleArrowRight
                        onClick={handleLoadCrewData}
                        className="my-auto h-16 w-16 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
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

        <div className="flex gap-8">
          <ModalComponent isOpen={isReviewFormOpen} onClose={() => setIsReviewFormOpen(false)}>
            <ReviewFormComponent movieId={movieId} />
          </ModalComponent>
          <ReviewListComponent movieId={movieId} />
        </div>

        <LoginRequiredModalComponent isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      </section>
    </main>
  );
}
