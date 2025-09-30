"use client";

import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { MovieCreditResponse, MovieDetailItem, MovieGenres } from "@/types/movie.type";
import { useGetCollectionList } from "@/queries/collections.query";
import { useGetFavoriteMovie } from "@/queries/favorites.query";
import { useGetWatchedDetail } from "@/queries/watches.query";
import { RatingComponent, Slider } from "@/components";
import { PersonCard } from "@/components/card-template/person-card.component";
import { SliderSection } from "@/components/slider-section/slider-section.component";
import { CollectionControlComponent } from "./collection-control.component";
import { FavoriteControlComponent } from "./favorite-control.component";
import { WatchedControlComponent } from "./watched-control.compoent";

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
  creditData: MovieCreditResponse;
  rating: number;
}

export function MovieInfoSection({ userId, movieData, creditData, rating }: MovieInfoProps) {
  const { data: favoriteMovie } = useGetFavoriteMovie(userId, movieData.id);
  const { data: collectionList } = useGetCollectionList(userId);
  const { data: watchedMovie } = useGetWatchedDetail(userId, movieData.id);

  return (
    <section className="flex w-full flex-col gap-8">
      {/* 영화 제목 */}
      <div className="flex items-center gap-8">
        <h1 className="text-nowrap text-3xl font-bold">{movieData.title}</h1>
        <div className="w-full border-b" />
      </div>

      <div className="flex min-w-0 justify-between gap-8 max-lg:flex-col max-lg:items-center">
        {/* 왼쪽 영역 (영화 포스터 + 컨트롤러 + 평점) */}
        <div className="flex flex-1 flex-col items-center gap-8">
          {/* 영화 포스터 */}
          <div className="relative aspect-[3/4] w-full min-w-[350px] max-w-[624px] shrink-0">
            <Image
              src={
                movieData.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                  : "/default.svg"
              }
              className="absolute h-full w-full rounded-xl object-contain"
              fill
              priority
              alt={`${movieData.title} 포스터`}
              sizes="624px"
            />
          </div>

          <div className="flex w-full max-w-[624px] flex-col items-center justify-center gap-8 rounded-xl bg-white/20 p-10">
            {/* 평균 평점 */}
            {rating > 0 ? (
              <div className="flex items-center gap-4">
                <p className="text-nowrap rounded-xl bg-point-color px-4 py-2 text-xl font-medium">
                  평점
                </p>
                <RatingComponent type="show" defaultValue={rating} />
                <p className="text-2xl font-semibold">{rating}점</p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <p className="text-nowrap rounded-xl bg-point-color px-4 py-2 text-xl font-medium">
                  평점
                </p>
                <p className="text-lg text-white/70">아직 등록된 평점이 없습니다.</p>
              </div>
            )}

            <div className="w-full border-b" />

            {/* 컨트롤 영역 (즐겨찾기, 컬렉션 추가, 시청기록 추가) */}
            <div className="flex items-center gap-2">
              <FavoriteControlComponent
                defaultValue={!userId ? null : favoriteMovie}
                movieId={movieData.id}
              />

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
          </div>
        </div>

        {/* 오른쪽 영역 (영화 상세 정보) */}
        <div className="flex min-w-0 max-w-[1000px] flex-col justify-between gap-8 text-lg">
          {/* 기본 정보 */}
          <p>{movieData.overview}</p>

          <div className="flex items-center gap-4">
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

          {/* 출연진 & 제작진 리스트 */}
          <div className="flex flex-col">
            <SliderSection title="출연진">
              <Slider>
                {creditData.cast?.map((cast) => (
                  <SwiperSlide>
                    <PersonCard type="cast" creditData={cast} />
                  </SwiperSlide>
                ))}
              </Slider>
            </SliderSection>

            <SliderSection title="제작진">
              <Slider>
                {creditData.crew?.map((crew) => (
                  <SwiperSlide>
                    <PersonCard type="crew" creditData={crew} />
                  </SwiperSlide>
                ))}
              </Slider>
            </SliderSection>
          </div>
        </div>
      </div>
    </section>
  );
}
