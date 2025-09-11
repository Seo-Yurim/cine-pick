"use client";

import { ButtonComponent, LoadingComponent } from "@/components";
import { useMovieCredits, useMovieDetail } from "@/queries/movie.query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MovieCast, MovieCrew, MovieGenres } from "@/types/movie.type";
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
  const params = useParams();
  const movieId = params.id;

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

  if (isMovieLoading || isCreditLoading)
    return <LoadingComponent label="로딩 중 ... " isIndeterminate />;

  const moviePosterUrl = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : "/default.svg";

  console.log(creditData);

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-8 py-8">
      <section className="flex w-full flex-col gap-8">
        <div className="flex items-center gap-8">
          <h1 className="text-nowrap text-2xl font-bold">{movieData.title}</h1>
          <div className="w-full border-b" />
        </div>

        <div className="flex min-w-0 justify-between gap-8 max-lg:flex-col max-lg:items-center">
          <div className="relative aspect-[3/4] w-full min-w-[500px] max-w-[624px] shrink-0">
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
              {/* 평점 별로 변환해서 반환 */}
              <p>{movieData.vote_average}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <p className="text-nowrap text-lg font-medium">출연진</p>
                  <div className="w-full border-b" />
                </div>
                <div className="flex flex-col gap-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
                  <div className="mb-4 grid w-full auto-cols-auto grid-flow-col gap-8">
                    {creditData.cast.slice(0, 7).map((credit: MovieCast) => (
                      <div
                        key={credit.cast_id}
                        className="flex flex-col items-center gap-2 text-nowrap text-center"
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <p className="text-nowrap text-lg font-medium">제작진</p>
                  <div className="w-full border-b" />
                </div>
                <div className="flex flex-col gap-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
                  <div className="mb-4 grid w-full auto-cols-auto grid-flow-col gap-8">
                    {creditData.crew.slice(0, 7).map((credit: MovieCrew) => (
                      <div
                        key={`${credit.id} ${credit.name} ${credit.job}`}
                        className="flex flex-col items-center gap-2 text-center"
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 rounded-xl bg-white/30 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">리뷰 (0)</h2>
          <ButtonComponent>리뷰 작성하기</ButtonComponent>
        </div>

        <div className="flex gap-8">
          {/* 리뷰 작성은 모달로 */}
          {/* <ReviewFormComponent /> */}
          <ReviewListComponent />
        </div>
      </section>
    </main>
  );
}
