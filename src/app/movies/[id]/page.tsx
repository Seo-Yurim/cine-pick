"use client";

import { SwiperSlide } from "swiper/react";
import { useParams } from "next/navigation";
import { MovieCast, MovieCrew } from "@/types/movie.type";
import { getAvgRating } from "@/utils/avg-rating.util";
import { useAuthStore } from "@/stores/auth.store";
import { useMovieCredits, useMovieDetail } from "@/queries/movie.query";
import { useGetReviews } from "@/queries/reviews.query";
import { Slider } from "@/components";
import { PersonCardSkeletonComponent } from "@/components/skeleton/person-card-skeleton.component";
import { SliderSection } from "@/components/slider-section/slider-section.component";
import { MovieInfoSection } from "./_components";
import { PersonCard } from "./_components/person-card.component";

export default function MoviesDetailPage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

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
      <MovieInfoSection
        userId={userId}
        movieData={movieDetail}
        reviewData={reviewList}
        isMovieLoading={!movieData}
        rating={avg}
      />
      {/* 출연진 & 제작진 리스트 */}
      <div className="flex flex-col gap-4">
        <SliderSection title="출연진">
          {creditData && creditData.cast ? (
            <Slider slidesPerView={5}>
              {creditList?.cast?.map((cast: MovieCast) => (
                <SwiperSlide className="p-3">
                  <PersonCard type="cast" creditData={cast} />
                </SwiperSlide>
              ))}
            </Slider>
          ) : (
            <div className="flex gap-8 p-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <PersonCardSkeletonComponent key={idx} />
              ))}
            </div>
          )}
        </SliderSection>

        <SliderSection title="제작진">
          {creditData && creditData.crew ? (
            <Slider slidesPerView={5}>
              {creditList.crew?.map((crew: MovieCrew) => (
                <SwiperSlide className="p-3">
                  <PersonCard type="crew" creditData={crew} />
                </SwiperSlide>
              ))}
            </Slider>
          ) : (
            <div className="flex gap-8 p-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <PersonCardSkeletonComponent key={idx} />
              ))}
            </div>
          )}
        </SliderSection>
      </div>
    </main>
  );
}
