"use client";

import { SwiperSlide } from "swiper/react";
import { MovieCast, MovieCreditResponse, MovieCrew, MovieDetailItem } from "@/types/movie.type";
import { ReviewItem } from "@/types/reviews.type";
import { getAvgRating } from "@/utils/avg-rating.util";
import { useAuthStore } from "@/stores/auth.store";
import { useGetReviews } from "@/queries/reviews.query";
import { PersonCard, PersonCardSkeletonComponent, Slider, SliderSection } from "@/components";
import { MovieInfoComponent } from "./_components";

interface MovieDetailClientProps {
  movieDetail: MovieDetailItem;
  movieCredits: MovieCreditResponse;
}

export default function MovieDetailClient({ movieDetail, movieCredits }: MovieDetailClientProps) {
  const { user } = useAuthStore();
  const userId = user?.id ?? "";

  const { data: movieReviews } = useGetReviews(movieDetail.id);

  const ratingAvg = getAvgRating(movieReviews);

  return (
    <>
      <MovieInfoComponent
        userId={userId}
        movieData={movieDetail}
        reviewData={movieReviews}
        isMovieLoading={!movieDetail || !movieReviews}
        rating={ratingAvg}
      />

      <SliderSection title="출연진">
        {movieCredits.cast && movieCredits.cast.length > 0 ? (
          <Slider slidesPerView={5}>
            {movieCredits.cast.map((cast: MovieCast) => (
              <SwiperSlide key={`${cast.id} ${cast.cast_id}`} className="max-w-[20%] p-3">
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
        {movieCredits.crew && movieCredits.crew.length > 0 ? (
          <Slider slidesPerView={5}>
            {movieCredits.crew.map((crew: MovieCrew) => (
              <SwiperSlide key={`${crew.id} ${crew.credit_id}`} className="max-w-[20%] p-3">
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
