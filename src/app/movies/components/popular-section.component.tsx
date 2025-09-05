"use client";

import { useMovies } from "@/queries/movie.query";
import { MovieItem } from "@/types/movie.type";
import ButtonComponent from "@/components/button/button.component";
import MovieCardComponent from "@/components/movie-card/movie-card.component";

export default function PopularSectionComponent() {
  const { data, isLoading, isError } = useMovies({
    sort_by: "popularity.desc",
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies</p>;

  return (
    <section className="flex bg-point-color p-6">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col justify-center gap-4">
        <div className="flex items-center justify-between text-nowrap">
          <h2 className="text-3xl font-bold">오늘의 인기 영화</h2>
          <ButtonComponent>전체보기</ButtonComponent>
        </div>

        <div className="flex items-center overflow-x-auto">
          <div className="mb-4 flex w-full items-center gap-4 px-4">
            {data.results.map((item: MovieItem) => (
              <MovieCardComponent key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
