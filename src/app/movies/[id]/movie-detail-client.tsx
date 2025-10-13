"use client";

import { SwiperSlide } from "swiper/react";
import { MovieCast, MovieCrew } from "@/types/movie.type";
import { getAvgRating } from "@/utils/avg-rating.util";
import { useAuthStore } from "@/stores/auth.store";
import { useMovieCredits, useMovieDetail } from "@/queries/movie.query";
import { useGetReviews } from "@/queries/reviews.query";
import { PersonCard, PersonCardSkeletonComponent, Slider, SliderSection } from "@/components";
import { MovieInfoComponent } from "./_components";

export default function MovieDetailClient({ movieId }: { movieId: number }) {
  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const { data: movieData } = useMovieDetail(movieId);
  const { data: creditData } = useMovieCredits(movieId);
  const { data: reviewData } = useGetReviews();

  const movieDetail = movieData ?? {};
  const creditList = creditData ?? [];
  const reviewList = reviewData ?? [];

  const avg = getAvgRating(movieId, reviewList);

  return (
    <>
      <MovieInfoComponent
        userId={userId}
        movieData={movieDetail}
        reviewData={reviewList}
        isMovieLoading={!movieData || !reviewData}
        rating={avg}
      />

      <SliderSection title="출연진">
        {creditList.cast && creditList.cast.length > 0 ? (
          <Slider slidesPerView={5}>
            {creditList.cast.map((cast: MovieCast) => (
              <SwiperSlide key={`${cast.id} ${cast.cast_id}`} className="p-3">
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
        {creditList.crew && creditList.crew.length > 0 ? (
          <Slider slidesPerView={5}>
            {creditList.crew.map((crew: MovieCrew) => (
              <SwiperSlide key={`${crew.id} ${crew.credit_id}`} className="p-3">
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
    </>
  );
}
