"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieItem, MovieParams } from "@/types/movie.type";
import { useMovies } from "@/queries/movie.query";
import { MovieCardComponent } from "@/components";
import MoviesHeaderComponent from "./components/movies-header.component";

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState<string>("grid");
  const [params, setParams] = useState<MovieParams>({
    page: 1,
    sort_by: "popularity.desc",
    with_genres: "",
    with_people: "",
    primary_release_year: "",
    "primary_release_date.gte": "",
    "primary_release_date.lte": "",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies(params);

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <MoviesHeaderComponent tab={activeTab} onTab={setActiveTab} onParams={setParams} />

      <InfiniteScroll
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<></>}
        dataLength={movies.length}
        className={
          activeTab === "grid"
            ? "grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-between lg:grid-cols-4"
            : "flex flex-col gap-4"
        }
      >
        {movies.map((result: MovieItem) => (
          <MovieCardComponent key={result.id} data={result} type={activeTab} minWidth="240px" />
        ))}
      </InfiniteScroll>
    </main>
  );
}
