"use client";

import { SwiperSlide } from "swiper/react";
import { MovieItem } from "@/types/movie.type";
import {
  useGenres,
  useGetNowPlayingMovies,
  useGetPopularMovies,
  useMovies,
} from "@/queries/movie.query";
import { MovieCardComponent, Slider } from "@/components";
import { SliderSection } from "../../../components/slider-section/slider-section.component";
import { HeroSection } from "./hero-section.component";

export default function Hydrated() {
  const today = new Date().toISOString().split("T")[0];

  const { data: genres } = useGenres();
  const { data: popularMoives } = useGetPopularMovies();
  const { data: nowPlayingMovies } = useGetNowPlayingMovies();
  const { data: newMovies } = useMovies({
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": today,
    with_origin_country: "KR",
  });

  return (
    <>
      <HeroSection popularData={popularMoives?.slice(0, 3)} genres={genres?.genres} />
      <SliderSection title="💥 지금 인기있는 영화">
        <Slider>
          {popularMoives?.map((data: MovieItem) => (
            <SwiperSlide key={data.id} className="p-4">
              <MovieCardComponent data={data} />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>

      <SliderSection title="🎞️ 극장에서 상영 중인 영화">
        <Slider>
          {nowPlayingMovies?.map((data: MovieItem) => (
            <SwiperSlide key={data.id} className="p-4">
              <MovieCardComponent data={data} />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>

      <SliderSection title="🆕 새로 개봉한 국내 영화">
        <Slider>
          {newMovies?.results.map((data: MovieItem) => (
            <SwiperSlide key={data.id} className="p-4">
              <MovieCardComponent data={data} />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>
    </>
  );
}
