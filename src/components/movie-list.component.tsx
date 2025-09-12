"use client";

import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MovieItem } from "@/types/movie.type";
import { ButtonComponent } from "./button/button.component";
import { MovieCardComponent } from "./movie-card/movie-card.component";

interface MovieListProps {
  title: string;
  bgColor?: string;
  btnText?: string;
  btnShow?: boolean;
  data: MovieItem[];
}

export function MovieListComponent({
  title,
  bgColor,
  btnText = "전체보기",
  btnShow = true,
  data,
}: MovieListProps) {
  return (
    <section style={{ backgroundColor: bgColor }} className="flex p-6">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col justify-center gap-4">
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

        <div className="flex items-center overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
          <div className="mb-4 grid w-full auto-cols-auto grid-flow-col items-stretch gap-4 p-4">
            {data.map((item) => (
              <MovieCardComponent key={item.id} data={item} />
            ))}
            <FaCircleArrowRight className="my-auto h-16 w-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
