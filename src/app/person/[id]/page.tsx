"use client";

import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { MovieItem } from "@/types/movie.type";
import { usePersonInfo, usePersonMovies } from "@/queries/person.query";
import { MovieCardComponent, Slider } from "@/components";
import { SliderSection } from "@/components/slider-section/slider-section.component";

const genderMapping: Record<string, ReactNode> = {
  1: <IoMdFemale className="h-6 w-6" />,
  2: <IoMdMale className="h-6 w-6" />,
};

export default function PersonDetailPage() {
  const params = useParams();
  const personId = params.id as string;

  const { data: personData } = usePersonInfo(personId);
  const { data: personMoviesData } = usePersonMovies(personId);

  const personInfo = personData ?? {};
  const personMovies = personMoviesData ?? [];

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-8 py-12">
      <h1 className="text-2xl font-bold">인물 상세 정보</h1>

      <section className="flex items-center gap-8 max-lg:flex-col">
        <div className="relative aspect-[3/4] w-full min-w-[350px] max-w-[624px] shrink-0">
          <Image
            src={
              personInfo.profile_path
                ? `https://image.tmdb.org/t/p/w500${personInfo.profile_path}`
                : "/default.svg"
            }
            className="absolute h-full w-full object-contain"
            fill
            priority
            alt="인물 이미지"
            sizes="624px"
          />
        </div>
        <div className="flex w-full flex-col gap-10 text-2xl font-semibold">
          <div className="flex h-fit items-center gap-2">
            <p>이름: {personInfo.name}</p> {genderMapping[personInfo.gender]}
          </div>
          <p>전문분야: {personInfo.known_for_department}</p>
          <p>생년월일: {personInfo.birthday}</p>
          <p>출생지: {personInfo.place_of_birth}</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SliderSection title="연기 활동">
          <Slider>
            {personMovies.cast?.map((movie: MovieItem) => (
              <SwiperSlide>
                <MovieCardComponent movie={movie} />
              </SwiperSlide>
            ))}
          </Slider>
        </SliderSection>

        <SliderSection title="제작 활동">
          <Slider>
            {personMovies.crew?.map((movie: MovieItem) => (
              <SwiperSlide>
                <MovieCardComponent movie={movie} />
              </SwiperSlide>
            ))}
          </Slider>
        </SliderSection>
      </section>
    </main>
  );
}
