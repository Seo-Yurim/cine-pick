"use client";

import Image from "next/image";
import {
  MovieAccountStates,
  MovieCreditResponse,
  MovieDetailItem,
  MovieGenres,
} from "@/types/movie.type";
import { RatingComponent } from "@/components";
import { FavoriteMovieComponent } from "@/components/favorite-movie.component";
import { PersonListComponent } from "./index";

const statusMapping: Record<string, string> = {
  Rumored: "제작 미정",
  Planned: "제작 예정",
  "In Production": "제작 진행 중",
  "Post Production": "편집 및 후반 작업 진행 중",
  Released: "공식 개봉",
  Canceled: "제작 취소",
};

interface MovieInfoProps {
  movieData: MovieDetailItem;
  creditData: MovieCreditResponse;
  movieAccountStates: MovieAccountStates;
}

export function MovieInfoSection({ movieData, creditData, movieAccountStates }: MovieInfoProps) {
  const moviePosterUrl = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : "/default.svg";

  return (
    <section className="flex w-full flex-col gap-8">
      <div className="flex items-center gap-8">
        <h1 className="text-nowrap text-3xl font-bold">{movieData.title}</h1>
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

        <div className="flex min-w-0 flex-col justify-between gap-8 text-lg">
          <p>{movieData.overview}</p>

          <div className="flex items-center gap-4">
            <FavoriteMovieComponent
              defaultValue={movieAccountStates.favorite}
              movieId={movieData.id}
            />
            <p className="rounded-xl border px-4 py-1">{movieData.release_date}</p>
            <div className="flex items-center gap-2 rounded-xl border px-4 py-1">
              {movieData.genres.map((genre: MovieGenres) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <p className="rounded-xl border px-4 py-1">{movieData.runtime}분</p>
            <p className="rounded-xl border px-4 py-1">{statusMapping[movieData.status]}</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="rounded-xl bg-point-color px-4 py-1 font-medium">내가 준 평점</p>
            {movieAccountStates.rated.value > 0 ? (
              <RatingComponent type="show" defaultValue={movieAccountStates.rated.value} />
            ) : (
              <p className="font-semibold">
                남긴 평점이 없습니다, 리뷰를 통해 이 영화를 평가해주세요!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <PersonListComponent type="cast" creditData={creditData.cast} />
            <PersonListComponent type="crew" creditData={creditData.crew} />
          </div>
        </div>
      </div>
    </section>
  );
}
