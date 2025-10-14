"use client";

import { SwiperSlide } from "swiper/react";
import { MovieItem } from "@/types/movie.type";
import { genresMatch } from "@/utils/genres-match.util";
import {
  useGenres,
  useGetNowPlayingMovies,
  useGetPopularMovies,
  useMovies,
} from "@/queries/movie.query";
import {
  MovieCardComponent,
  MovieCardSkeletonComponent,
  Slider,
  SliderSection,
} from "@/components";
import { HeroSection } from "./_components/hero-section.component";

export default function HomeClient({ today }: { today: string }) {
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
      <HeroSection
        popularMovies={popularMoives?.slice(0, 3)}
        genres={genres?.genres}
        isLoading={!popularMoives}
      />

      <SliderSection title="💥 지금 인기있는 영화">
        {popularMoives && genres ? (
          <Slider>
            {popularMoives.map((movie: MovieItem) => (
              <SwiperSlide key={movie.id} className="p-4">
                <MovieCardComponent
                  movie={movie}
                  genres={genresMatch(genres?.genres, movie.genre_ids)}
                />
              </SwiperSlide>
            ))}
          </Slider>
        ) : (
          <div className="flex gap-8 p-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <MovieCardSkeletonComponent key={idx} />
            ))}
          </div>
        )}
      </SliderSection>

      <SliderSection title="🎞️ 극장에서 상영 중인 영화">
        {nowPlayingMovies && genres ? (
          <Slider>
            {nowPlayingMovies?.map((movie: MovieItem) => (
              <SwiperSlide key={movie.id} className="p-4">
                <MovieCardComponent
                  movie={movie}
                  genres={genresMatch(genres?.genres, movie.genre_ids)}
                />
              </SwiperSlide>
            ))}
          </Slider>
        ) : (
          <div className="flex gap-8 p-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <MovieCardSkeletonComponent key={idx} />
            ))}
          </div>
        )}
      </SliderSection>

      <SliderSection title="🆕 새로 개봉한 국내 영화">
        {newMovies && genres ? (
          <Slider>
            {newMovies?.results.map((movie: MovieItem) => (
              <SwiperSlide key={movie.id} className="p-4">
                <MovieCardComponent
                  movie={movie}
                  genres={genresMatch(genres?.genres, movie.genre_ids)}
                />
              </SwiperSlide>
            ))}
          </Slider>
        ) : (
          <div className="flex gap-8 p-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <MovieCardSkeletonComponent key={idx} />
            ))}
          </div>
        )}
      </SliderSection>
    </>
  );
}
