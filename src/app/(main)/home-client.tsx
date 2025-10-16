"use client";

import { useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import { GenresList, MovieItem } from "@/types/movie.type";
import { genresMatch } from "@/utils/genres-match.util";
import { MovieCardComponent, Slider, SliderSection } from "@/components";
import { HeroSection } from "./_components/hero-section.component";

interface HomeClientProps {
  genres: GenresList;
  popularMoives: MovieItem[];
  nowPlayingMovies: MovieItem[];
  newMovies: MovieItem[];
}

export default function HomeClient({
                                     genres,
                                     popularMoives,
                                     nowPlayingMovies,
                                     newMovies,
                                   }: HomeClientProps) {
  const popularSlides = useMemo(
    () =>
      popularMoives.map((movie) => (
        <SwiperSlide key={movie.id} className="max-w-[25%] p-4">
          <MovieCardComponent
            movie={movie}
            genres={genresMatch(genres.genres, movie.genre_ids)}
          />
        </SwiperSlide>
      )),
    [popularMoives, genres],
  );

  const nowPlayingSlides = useMemo(
    () =>
      nowPlayingMovies.map((movie) => (
        <SwiperSlide key={movie.id} className="max-w-[25%] p-4">
          <MovieCardComponent
            movie={movie}
            genres={genresMatch(genres.genres, movie.genre_ids)}
          />
        </SwiperSlide>
      )),
    [nowPlayingMovies, genres],
  );

  const newSlides = useMemo(
    () =>
      newMovies.map((movie) => (
        <SwiperSlide key={movie.id} className="max-w-[25%] p-4">
          <MovieCardComponent
            movie={movie}
            genres={genresMatch(genres.genres, movie.genre_ids)}
          />
        </SwiperSlide>
      )),
    [newMovies, genres],
  );

  return (
    <>
      <HeroSection
        popularMovies={popularMoives.slice(0, 3)}
        genres={genres.genres}
        isLoading={!popularMoives}
      />

      <SliderSection title="💥 지금 인기있는 영화">
        <Slider>{popularSlides}</Slider>
      </SliderSection>

      <SliderSection title="🎞️ 극장에서 상영 중인 영화">
        <Slider>{nowPlayingSlides}</Slider>
      </SliderSection>

      <SliderSection title="🆕 새로 개봉한 국내 영화">
        <Slider>{newSlides}</Slider>
      </SliderSection>
    </>
  );
}
