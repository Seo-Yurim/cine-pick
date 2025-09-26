"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { MovieItem } from "@/types/movie.type";
import { ButtonComponent } from "./button/button.component";
import { MovieCardComponent } from "./movie-card.component";

interface MovieListProps {
  title: string;
  bgColor?: string;
  btnText?: string;
  btnShow?: boolean;
  data: MovieItem[];
}

export function Slider({
  title,
  bgColor,
  btnText = "전체보기",
  btnShow = true,
  data,
}: MovieListProps) {
  return (
    <div style={{ backgroundColor: bgColor }} className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-8 text-nowrap">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="w-full border-b" />
        {btnShow &&
          (btnText === "전체보기" ? (
            <Link href="/movies">
              <ButtonComponent>전체보기</ButtonComponent>
            </Link>
          ) : (
            <ButtonComponent>{btnText}</ButtonComponent>
          ))}
      </div>

      <div className="swiper-container">
        <Swiper
          slidesPerView={4}
          spaceBetween={1}
          navigation={true}
          breakpoints={{
            1400: {
              slidesPerView: 4,
              spaceBetween: 1,
            },
            1080: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            624: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
          }}
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id} className="p-4">
              <MovieCardComponent data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
