"use client";

import { MovieItem } from "@/types/movie.type";
import ButtonComponent from "../button/button.component";
import MovieCardComponent from "../movie-card/movie-card.component";

interface MovieListProps {
  title: string;
  bgColor?: string;
  data: MovieItem[];
}

export default function MovieListComponent({ title, bgColor, data }: MovieListProps) {
  return (
    <section style={{ backgroundColor: bgColor }} className="flex p-6">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col justify-center gap-4">
        <div className="flex items-center justify-between text-nowrap">
          <h2 className="text-3xl font-bold">{title}</h2>
          <ButtonComponent>전체보기</ButtonComponent>
        </div>

        <div className="flex items-center overflow-x-auto">
          <div className="mb-4 grid w-full auto-cols-auto grid-flow-col items-stretch gap-4 p-4">
            {data.map((item: MovieItem) => (
              <MovieCardComponent key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
