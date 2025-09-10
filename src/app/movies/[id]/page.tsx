"use client";

import { LoadingComponent } from "@/components";
import { useMovieCredits, useMovieDetail } from "@/queries/movie.query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MovieCast, MovieCrew, MovieGenres } from "@/types/movie.type";

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

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-8">
          <h1 className="text-nowrap text-2xl font-bold">{movieData.title}</h1>
          <div className="w-full border-b" />
        </div>

        <div className="flex justify-between gap-8">
          <div className="relative aspect-[3/4] w-full min-w-[200px]">
            <Image
              src={moviePosterUrl}
              className="absolute h-full w-full rounded-xl object-cover"
              fill
              priority
              alt={`${movieData.title} 포스터`}
              sizes="412px"
            />
          </div>

          <div className="flex max-w-[1200px] flex-col gap-8">
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
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 overflow-x-auto rounded-xl bg-point-color p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
                <p>출연진</p>
                <div className="mb-4 grid w-full auto-cols-auto grid-flow-col items-stretch gap-4">
                  {creditData.cast.map((credit: MovieCast) => (
                    <div key={credit.cast_id} className="flex flex-col items-center gap-2">
                      <div className="relative aspect-[3/4] w-full min-w-[200px]">
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
                          sizes="312px"
                        />
                      </div>
                      <p>{credit.name}</p>
                      <p>{credit.character} 역</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 overflow-x-auto rounded-xl bg-point-color p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
                <p>제작진</p>
                <div className="mb-4 grid w-full auto-cols-auto grid-flow-col items-stretch gap-4">
                  {creditData.crew.map((credit: MovieCrew) => (
                    <div
                      key={`${credit.id} ${credit.name} ${credit.job}`}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="relative aspect-[3/4] w-full min-w-[200px]">
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
                          sizes="312px"
                        />
                      </div>
                      <p>{credit.name}</p>
                      <p>{credit.job}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2>리뷰 (0)</h2>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-8">
            <p>평점</p>
            <p>리뷰 폼</p>
          </div>
          <div>
            <p>리뷰 목록</p>
          </div>
        </div>
      </div>
    </main>
  );
}
