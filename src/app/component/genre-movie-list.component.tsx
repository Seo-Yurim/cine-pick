import { useGenres, useMovies } from "@/queries/movie.query";
import { useMemo, useRef, useState } from "react";
import { MovieItem } from "@/types/movie.type";
import ButtonComponent from "@/components/button/button.component";
import MovieCardComponent from "@/components/movie-card/movie-card.component";
import ToggleButtonComponent from "@/components/toggle-button/toggle-button.component";

export function GenreMovieListComponent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  const { data: genres, isLoading: isGenresLoading, isError: isGenresErr } = useGenres();

  const toggleMenus = useMemo(() => {
    if (!genres) return [];

    return [
      { label: "전체", value: "" },
      ...genres.genres.map((genre: Record<string, string>) => ({
        label: genre.name,
        value: String(genre.id),
      })),
    ];
  }, [genres]);

  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresErr,
  } = useMovies({
    sort_by: "popularity.desc",
    with_genres: activeTab,
  });

  if (genresLoading) return <div>loading .. </div>;
  if (genresErr) return <div>error .. </div>;

  return (
    <section className="flex p-6">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col justify-center gap-4">
        <div className="flex items-center justify-between text-nowrap">
          <div className="flex items-center gap-8">
            <h2 className="text-3xl font-bold">장르별 추천 영화</h2>
            <div className="flex items-center gap-2">
              <button onClick={scrollLeft} className="px-2 text-2xl">
                ◀
              </button>

              <div className="w-full max-w-[600px] overflow-x-hidden" ref={scrollRef}>
                <ToggleButtonComponent
                  toggleMenus={toggleMenus}
                  activeTab={activeTab}
                  onChange={handleTabClick}
                />
              </div>

              <button onClick={scrollRight} className="px-2 text-2xl">
                ▶
              </button>
            </div>
          </div>
          <ButtonComponent>전체보기</ButtonComponent>
        </div>

        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground flex items-center overflow-x-auto">
          <div className="mb-4 grid auto-cols-auto grid-flow-col items-stretch gap-4 p-4">
            {genresData.results.map((item: MovieItem) => (
              <MovieCardComponent key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
