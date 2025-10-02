"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MovieItem, MovieParams } from "@/types/movie.type";
import { genresMatch } from "@/utils/genres-match.util";
import { useGenres, useInfinityMovies } from "@/queries/movie.query";
import { MovieCardComponent } from "@/components";
import { MovieListComponent } from "@/components/movie-template/movie-list.component";
import { MovieCardSkeletonComponent } from "@/components/skeleton/movie-card-skeleton.component";
import MoviesHeaderComponent from "./_components/movies-header.component";
import { ScrollToTop } from "./_components/scroll-to-top.component";

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

  const { data, fetchNextPage, hasNextPage } = useInfinityMovies(params);
  const { data: genres } = useGenres();

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <>
      <MoviesHeaderComponent tab={activeTab} onTab={setActiveTab} onParams={setParams} />

      <InfiniteScroll
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<></>}
        dataLength={movies.length}
        className={`px-8 ${activeTab === "grid" ? "grid grid-cols-4 gap-6 py-4" : "flex flex-col gap-4"} `}
      >
        {movies && genres
          ? movies.map((movie: MovieItem) =>
              activeTab === "grid" ? (
                <MovieCardComponent
                  key={movie.id}
                  movie={movie}
                  genres={genresMatch(genres?.genres, movie.genre_ids)}
                />
              ) : (
                <MovieListComponent
                  key={movie.id}
                  movie={movie}
                  genres={genresMatch(genres?.genres, movie.genre_ids)}
                />
              ),
            )
          : Array.from({ length: 20 }).map((_, idx) => <MovieCardSkeletonComponent key={idx} />)}
      </InfiniteScroll>

      <ScrollToTop />
    </>
  );
}
