"use client";

import { SwiperSlide } from "swiper/react";
import Link from "next/link";
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
  return (
    <>
      <HeroSection
        popularMovies={popularMoives?.slice(0, 3)}
        genres={genres.genres}
        isLoading={!popularMoives}
      />

      <SliderSection
        title="💥 전체 영화"
        controls={<Link href={"/movies?value=vote_count.desc"}>더보기</Link>}
      >
        <Slider>
          {popularMoives.map((movie: MovieItem) => (
            <SwiperSlide key={movie.id} className="max-w-[25%] p-4">
              <MovieCardComponent
                movie={movie}
                genres={genresMatch(genres?.genres, movie.genre_ids)}
              />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>

      <SliderSection
        title="💰 흥행한 영화"
        controls={<Link href={"/movies?value=revenue.desc"}>더보기</Link>}
      >
        <Slider>
          {nowPlayingMovies.map((movie: MovieItem) => (
            <SwiperSlide key={movie.id} className="max-w-[25%] p-4">
              <MovieCardComponent
                movie={movie}
                genres={genresMatch(genres?.genres, movie.genre_ids)}
              />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>

      <SliderSection
        title="🆕 새로 개봉한 국내 영화"
        controls={<Link href={"/movies?value=primary_release_date.desc"}>더보기</Link>}
      >
        <Slider>
          {newMovies.map((movie: MovieItem) => (
            <SwiperSlide key={movie.id} className="max-w-[25%] p-4">
              <MovieCardComponent
                movie={movie}
                genres={genresMatch(genres?.genres, movie.genre_ids)}
              />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>
    </>
  );
}
