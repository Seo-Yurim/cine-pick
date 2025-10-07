"use client";

import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { MovieItem } from "@/types/movie.type";
import { genresMatch } from "@/utils/genres-match.util";
import { useGenres } from "@/queries/movie.query";
import { usePersonInfo, usePersonMovies } from "@/queries/person.query";
import {
  MovieCardComponent,
  MovieCardSkeletonComponent,
  Slider,
  SliderSection,
} from "@/components";

const genderMapping: Record<string, ReactNode> = {
  1: <IoMdFemale className="h-6 w-6" />,
  2: <IoMdMale className="h-6 w-6" />,
};

export default function PersonDetailPage() {
  const params = useParams();
  const personId = params.id as string;

  const { data: genres } = useGenres();
  const { data: personData } = usePersonInfo(personId);
  const { data: personMoviesData } = usePersonMovies(personId);

  const personInfo = personData ?? {};
  const personMovies = personMoviesData ?? [];

  return (
    <>
      <h1 className="text-3xl font-bold">인물 상세 정보</h1>

      <div className="flex justify-between gap-8">
        <div className="flex w-full flex-col items-center gap-8 py-4">
          <div className="relative aspect-[3/4] w-full min-w-[400px] max-w-[500px] shrink-0 rounded-xl">
            <Image
              src={
                personInfo.profile_path
                  ? `https://image.tmdb.org/t/p/w500${personInfo.profile_path}`
                  : "/default.svg"
              }
              className="absolute h-full w-full rounded-xl object-cover"
              fill
              priority
              alt="인물 이미지"
              sizes="624px"
            />
          </div>
          <div className="flex flex-col gap-6 border-l pl-4 text-xl font-semibold">
            <div className="flex h-fit items-center gap-2">
              <p>이름: {personInfo.name}</p> {genderMapping[personInfo.gender]}
            </div>
            <p>전문분야: {personInfo.known_for_department}</p>
            <p>생년월일: {personInfo.birthday}</p>
            <p>출생지: {personInfo.place_of_birth}</p>
          </div>
        </div>

        <div className="flex max-w-[1100px] flex-col gap-8">
          <SliderSection title="연기 활동">
            {personMovies.cast && genres ? (
              <Slider>
                {personMovies.cast?.map((movie: MovieItem) => (
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
          <SliderSection title="제작 활동">
            {personMovies.crew && genres ? (
              <Slider>
                {personMovies.crew?.map((movie: MovieItem) => (
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
        </div>
      </div>
    </>
  );
}
