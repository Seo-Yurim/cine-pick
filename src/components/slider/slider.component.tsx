"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { ReactNode } from "react";
import "./slider.component.scss";

interface SliderProps {
  children?: ReactNode;
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  isNavigation?: boolean;
}

export function Slider({
  children,
  slidesPerView = 4,
  spaceBetween = 1,
  isNavigation = true,
}: SliderProps) {
  return (
    <Swiper
      className="swiper-wrapper"
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      navigation={isNavigation}
      modules={[Navigation]}
      breakpoints={{
        1400: {
          slidesPerView,
          spaceBetween,
        },
        1080: {
          slidesPerView: typeof slidesPerView === "number" ? Math.min(slidesPerView, 3) : "auto",
          spaceBetween,
        },
        624: {
          slidesPerView: typeof slidesPerView === "number" ? Math.min(slidesPerView, 2) : "auto",
          spaceBetween,
        },
        0: {
          slidesPerView: 1,
          spaceBetween,
        },
      }}
    >
      {children}
    </Swiper>
  );
}
