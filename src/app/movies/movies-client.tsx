"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GenresList, MovieItem, MovieParams, MovieResponse } from "@/types/movie.type";
import { genresMatch } from "@/utils/genres-match.util";
import { useInfinityMovies } from "@/queries/movie.query";
import { MovieCardComponent } from "@/components";
import { MovieListComponent } from "@/components/movie-template/movie-list.component";
import { MovieCardSkeletonComponent } from "@/components/skeleton/movie-card-skeleton.component";
import MoviesHeaderComponent from "./_components/movies-header.component";
import { ScrollToTop } from "./_components/scroll-to-top.component";

interface MoviesClientProps {
  genres: GenresList;
  initialMovies: MovieResponse;
}

export default function MoviesClient({ genres, initialMovies }: MoviesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("view") ?? "grid";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [params, setParams] = useState<MovieParams>({
    page: 1,
    sort_by: "popularity.desc",
    with_genres: "",
    with_people: "",
    primary_release_year: "",
    "primary_release_date.gte": "",
    "primary_release_date.lte": "",
  });

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfinityMovies(
    params,
    initialMovies,
  );

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "grid" || viewParam === "list") {
      setActiveTab(viewParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    const params = new URLSearchParams(searchParams.toString());
    params.set("view", tab);

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <MoviesHeaderComponent tab={activeTab} onTab={handleTabChange} onParams={setParams} />

      <InfiniteScroll
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<></>}
        dataLength={movies.length}
        className={`px-2 ${activeTab === "grid" ? "grid grid-cols-4 gap-6 py-4" : "flex flex-col gap-4"} `}
      >
        {movies.map((movie: MovieItem) =>
          activeTab === "grid" ? (
            <MovieCardComponent
              key={movie.id}
              movie={movie}
              genres={genresMatch(genres?.genres, movie.genre_ids)}
              isLoading={!data || isLoading || isFetching}
            />
          ) : (
            <MovieListComponent
              key={movie.id}
              movie={movie}
              genres={genresMatch(genres?.genres, movie.genre_ids)}
              isLoading={!data || isLoading || isFetching}
            />
          ),
        )}
      </InfiniteScroll>

      <ScrollToTop />
    </>
  );
}
