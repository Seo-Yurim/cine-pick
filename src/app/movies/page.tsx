"use client";

import { useEffect, useState } from "react";
import { MovieItem, MovieParams } from "@/types/movie.type";
import { useMovies } from "@/queries/movie.query";
import { MovieCardComponent } from "@/components";
import Pagination from "@/components/pagination.component";
import MoviesHeaderComponent from "./components/movies-header.component";

export default function MoviesPage() {
  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("grid");
  const [params, setParams] = useState<MovieParams>({
    page,
    sort_by: "popularity.desc",
    with_genres: "",
    with_people: "",
    primary_release_year: "",
    "primary_release_date.gte": "",
    "primary_release_date.lte": "",
  });

  const { data: movies } = useMovies(params);

  // 고려
  useEffect(() => {
    setParams((prev) => ({ ...prev, page }));
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [params]);

  const totalPages = movies?.total_pages ?? 1;

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <MoviesHeaderComponent tab={activeTab} onTab={setActiveTab} onParams={setParams} />

      <div
        className={
          activeTab === "grid"
            ? "grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-between lg:grid-cols-4"
            : "flex flex-col gap-4"
        }
      >
        {movies?.results.map((result: MovieItem) => (
          <MovieCardComponent key={result.id} data={result} type={activeTab} minWidth="240px" />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </main>
  );
}
