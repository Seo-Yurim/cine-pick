"use client";

import { useMovies } from "@/queries/movie.query";
import { useState } from "react";
import toast from "react-hot-toast";
import { MovieItem } from "@/types/movie.type";
import LoadingComponent from "@/components/loading.component";
import MovieCardComponent from "@/components/movie-card/movie-card.component";
import MoviesHeaderComponent from "./components/movies-header.component";

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState<string>("grid");

  const { data, isLoading, isError } = useMovies();

  if (isError) toast.error("데이터를 불러오는 중 에러가 발생했어요.", { duration: 3000 });

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <MoviesHeaderComponent tab={activeTab} onTab={setActiveTab} />
      <div
        className={
          activeTab === "grid"
            ? "grid grid-cols-4 gap-4 xl:gap-x-12 xl:gap-y-8"
            : "flex flex-col gap-4"
        }
      >
        {isLoading ? (
          <LoadingComponent label="로딩 중 ... " isIndeterminate />
        ) : (
          data.results.map((result: MovieItem) => (
            <MovieCardComponent key={result.id} data={result} type={activeTab} />
          ))
        )}
      </div>
    </main>
  );
}
