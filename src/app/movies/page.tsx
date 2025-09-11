"use client";

import { LoadingComponent, MovieCardComponent } from "@/components";
import { useMovies } from "@/queries/movie.query";
import { useState } from "react";
import toast from "react-hot-toast";
import { MovieItem, MovieParams } from "@/types/movie.type";
import MoviesHeaderComponent from "./components/movies-header.component";

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState<string>("grid");
  const [params, setParams] = useState<MovieParams>({
    sort_by: "popularity.desc",
    with_genres: "",
    with_people: "",
    primary_release_year: "",
    "primary_release_date.gte": "",
    "primary_release_date.lte": "",
  });

  const { data, isLoading, isError } = useMovies(params);

  if (isError) toast.error("데이터를 불러오는 중 에러가 발생했어요.", { duration: 3000 });

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <MoviesHeaderComponent tab={activeTab} onTab={setActiveTab} onParams={setParams} />

      {isLoading && <LoadingComponent label="로딩 중 ... " isIndeterminate />}

      <div
        className={
          activeTab === "grid"
            ? "grid grid-cols-1 justify-items-center gap-2 md:grid-cols-2 md:justify-between lg:grid-cols-4"
            : "flex flex-col gap-4"
        }
      >
        {data?.results.map((result: MovieItem) => (
          <MovieCardComponent key={result.id} data={result} type={activeTab} minWidth="240px" />
        ))}
      </div>
    </main>
  );
}
