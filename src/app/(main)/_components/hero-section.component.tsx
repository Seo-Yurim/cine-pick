import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { MovieGenres, MovieItem } from "@/types/movie.type";
import { genresMatch } from "@/utils/genres-match.util";
import { ButtonComponent, HeroSectionSkeleton } from "@/components";

interface HeroSectionProps {
  popularMovies: MovieItem[];
  genres: MovieGenres[];
  isLoading?: boolean;
}

export function HeroSection({ popularMovies, genres, isLoading = false }: HeroSectionProps) {
  return (
    <section>
      <h2 className="pb-8 text-4xl font-bold">👑 오늘의 인기 영화 TOP 3</h2>
      {isLoading ? (
        <HeroSectionSkeleton />
      ) : (
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          fadeEffect={{ crossFade: true }}
          modules={[Autoplay, EffectFade, Navigation]}
        >
          {popularMovies?.map((movie, idx) => (
            <SwiperSlide key={movie.id}>
              <div
                className="absolute inset-0 h-[700px] w-full bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                }}
              />

              <div className="relative z-10 flex h-full items-stretch justify-center gap-8 p-16">
                <div className="rounded-xl bg-white p-4 shadow-xl">
                  <div className="relative aspect-[3/4] w-full min-w-[400px]">
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/default.svg"
                      }
                      className="absolute h-full w-full rounded-xl object-cover"
                      fill
                      priority
                      fetchPriority="high"
                      alt={`${movie.title} 포스터`}
                      sizes="400px"
                    />
                    <FaCrown
                      size={72}
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 ${idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-500" : "text-yellow-800"}`}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col justify-center gap-12 rounded-xl bg-text-bg/70 p-8">
                  <div className="flex flex-wrap items-center justify-between gap-8">
                    <h3 className="text-3xl font-bold">{movie.title}</h3>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-semibold">{movie.release_date}</p>

                      <div className="flex flex-wrap gap-2 text-sm text-gray-200">
                        {genresMatch(genres, movie.genre_ids).map((genre: MovieGenres) => (
                          <span
                            key={genre.id}
                            className="rounded-lg bg-white/20 px-4 py-1 text-sm font-medium"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-lg font-medium">{movie.overview}</p>

                  <Link href={`/movies/${movie.id}`} className="ml-auto">
                    <ButtonComponent className="flex items-center gap-4 text-2xl font-semibold transition-colors duration-300 hover:text-point-color">
                      상세보기
                      <FaArrowAltCircleRight size={48} />
                    </ButtonComponent>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
