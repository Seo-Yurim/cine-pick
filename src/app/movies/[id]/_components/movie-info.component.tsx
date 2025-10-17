"use client";

import Image from "next/image";
import { MovieDetailItem, MovieGenres } from "@/types/movie.type";
import { ReviewItem } from "@/types/reviews.type";
import { useGetCollectionList } from "@/queries/collections.query";
import { useGetWatchedDetail } from "@/queries/watches.query";
import { MovieInfoSkeletonComponent } from "@/components/skeleton/movie-info-skeleton.component";
import {
  CollectionControlComponent,
  FavoriteControlComponent,
  ReviewListComponent,
  WatchedControlComponent,
} from "./index";

// 영화 개봉 상태
const statusMapping: Record<string, string> = {
  Rumored: "제작 미정",
  Planned: "제작 예정",
  "In Production": "제작 진행 중",
  "Post Production": "편집 및 후반 작업 진행 중",
  Released: "공식 개봉",
  Canceled: "제작 취소",
};

interface MovieInfoProps {
  userId: string;
  movieData: MovieDetailItem;
  reviewData: ReviewItem[];
  rating: number;
  isMovieLoading: boolean;
}

export function MovieInfoComponent({
  userId,
  movieData,
  reviewData,
  rating,
  isMovieLoading,
}: MovieInfoProps) {
  const { data: collectionList } = useGetCollectionList(userId);
  const { data: watchedMovie } = useGetWatchedDetail(userId, movieData.id);

  if (isMovieLoading || !movieData) {
    return <MovieInfoSkeletonComponent />;
  }

  return (
    <section className="flex w-full flex-col gap-8">
      {/* 영화 제목 */}
      <div className="flex items-center gap-8">
        <h1 className="text-nowrap text-3xl font-bold">{movieData.title}</h1>
        <div className="w-full border-b" />
      </div>

      <div className="flex justify-between gap-16 max-lg:flex-col max-lg:items-center">
        {/* 왼쪽 영역 (영화 포스터) */}
        <div className="relative aspect-[3/4] w-full min-w-[350px] max-w-[600px] shrink-0">
          <Image
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                : "/default.svg"
            }
            className="absolute h-full w-full rounded-xl bg-white object-cover"
            fill
            priority
            alt={`${movieData.title} 포스터`}
            sizes="600px"
          />
        </div>

        {/* 오른쪽 영역 (영화 상세 정보) */}
        <div className="flex w-full max-w-[1100px] flex-col items-stretch gap-8 text-lg">
          {/* 기본 정보 */}
          <div className="flex items-center gap-4 text-sm">
            <p className="rounded-xl border px-4 py-1">{movieData.release_date}</p>
            <p className="rounded-xl border px-4 py-1">{movieData.runtime}분</p>
            <p className="rounded-xl border px-4 py-1">{statusMapping[movieData.status]}</p>
            <div className="flex items-center gap-2">
              {movieData.genres?.map((genre: MovieGenres) => (
                <p key={genre.id} className="rounded-xl bg-white/30 px-4 py-1">
                  {genre.name}
                </p>
              ))}
            </div>
          </div>
          <p>{movieData.overview || "아직 등록된 줄거리가 없습니다."}</p>
          <div className="flex items-center gap-6">
            {userId && (
              <div className="flex items-center gap-2">
                <FavoriteControlComponent movieData={movieData} />

                <CollectionControlComponent
                  userId={userId}
                  movieData={movieData}
                  collectionList={collectionList}
                />

                <WatchedControlComponent
                  defaultValue={!userId ? null : watchedMovie}
                  movieId={movieData.id}
                />
              </div>
            )}

            {rating > 0 ? (
              <div className="flex items-center gap-4 rounded-xl border px-6 py-3">
                <span className="font-semibold">평균 평점</span>
                <span className="font-bold">
                  {rating} <span className="text-sm text-gray-400">/ 5</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-nowrap rounded-xl bg-point-color px-4 py-2 text-xl font-medium">
                  평점
                </p>
                <p className="text-lg text-white/70">아직 등록된 평점이 없습니다.</p>
              </div>
            )}
          </div>
          <ReviewListComponent userId={userId} reviewData={reviewData} movieId={movieData.id} />
        </div>
      </div>
    </section>
  );
}
