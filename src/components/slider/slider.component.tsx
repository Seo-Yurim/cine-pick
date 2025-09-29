"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { ReactNode } from "react";
import "./slider.component.scss";

interface SliderProps {
  children?: ReactNode;
}

export function Slider({ children }: SliderProps) {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        spaceBetween={1}
        navigation={true}
        modules={[Navigation]}
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
        {children}
      </Swiper>
    </div>
  );
}
