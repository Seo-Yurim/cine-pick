"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GenresList, MovieItem, MovieParams } from "@/types/movie.type";
import { useInfinityMovies } from "@/queries/movie.query";
import { MovieCardComponent } from "@/components";
import { MovieListComponent } from "@/components/movie-template/movie-list.component";
import { ScrollToTop } from "./_components/scroll-to-top.component";
import MoviesHeaderComponent from "./_components/movies-header.component";

interface MoviesClientProps {
  genres: GenresList;
}

export default function MoviesClient({ genres }: MoviesClientProps) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("view") ?? "grid";
  const [sort] = useState(searchParams.get("value"));
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [params, setParams] = useState<MovieParams>({
    page: 1,
    with_genres: "",
    with_people: "",
    sort_by: sort,
    primary_release_year: "",
    "primary_release_date.gte": "",
    "primary_release_date.lte": "",
  });

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfinityMovies(params);
  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  useEffect(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "grid" || viewParam === "list") {
      setActiveTab(viewParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("view", tab);
    window.history.replaceState(null, "", url.toString());
  };

  const genreMap = useMemo(() => new Map(genres?.genres?.map((g) => [g.id, g.name])), [genres]);

  const titleMap = () => {
    if (sort === "vote_count.desc") {
      return "🎬 전체 영화 목록";
    } else if (sort === "revenue.desc") {
      return "💰 흥행한 영화 목록";
    } else if (sort === "primary_release_date.desc") {
      return "🆕 최신 국내 개봉 영화 목록";
    } else {
      return "🍿 영화 목록";
    }
  };

  return (
    <>
      <MoviesHeaderComponent
        title={titleMap}
        tab={activeTab}
        onTab={handleTabChange}
        onParams={setParams}
        sort={sort}
      />

      <InfiniteScroll
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<></>}
        dataLength={movies.length}
        className={`px-2 ${activeTab === "grid" ? "grid grid-cols-4 gap-6 py-4" : "flex flex-col gap-4"}`}
      >
        {movies.map((movie: MovieItem) => {
          const movieGenres = movie.genre_ids
            .map((id) => {
              const name = genreMap.get(id);
              return name ? { id, name } : null;
            })
            .filter((g): g is { id: number; name: string } => g !== null);

          return activeTab === "grid" ? (
            <MovieCardComponent
              key={movie.id}
              movie={movie}
              genres={movieGenres}
              isLoading={!data || isLoading || isFetching}
            />
          ) : (
            <MovieListComponent
              key={movie.id}
              movie={movie}
              genres={movieGenres}
              isLoading={!data || isLoading || isFetching}
            />
          );
        })}
      </InfiniteScroll>
      <ScrollToTop />
    </>
  );
}
