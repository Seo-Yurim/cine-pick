import { ButtonComponent, MovieCardComponent, ToggleButtonComponent } from "@/components";
import { useGenres, useMovies } from "@/queries/movie.query";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MovieItem } from "@/types/movie.type";

export function GenreMovieListComponent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(true);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  const { data: genres, isLoading: genresLoading, isError: genresErr } = useGenres();

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
    data: popularData,
    isLoading: popularLoading,
    isError: popularErr,
  } = useMovies({
    sort_by: "popularity.desc",
    with_genres: activeTab,
  });

  const isLoading = popularLoading || genresLoading;
  const isError = genresErr || popularErr;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setShowLoading(true);
    } else {
      timeout = setTimeout(() => setShowLoading(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (isError) toast.error("데이터를 불러오는 중 오류가 발생하였습니다.");

  return (
    <section className="flex p-6">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col justify-center gap-4">
        <div className="flex w-full items-center justify-between gap-4 text-nowrap">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <h2 className="whitespace-nowrap text-3xl font-bold">장르별 추천 영화</h2>

            <div className="flex min-w-0 flex-1 items-center gap-2">
              <button onClick={scrollLeft} className="shrink-0 px-2 text-2xl">
                ◀
              </button>

              <div className="min-w-0 flex-1 overflow-x-auto scrollbar-none" ref={scrollRef}>
                <ToggleButtonComponent
                  toggleMenus={toggleMenus}
                  activeTab={activeTab}
                  onChange={handleTabClick}
                />
              </div>

              <button onClick={scrollRight} className="shrink-0 px-2 text-2xl">
                ▶
              </button>
            </div>
          </div>

          <Link href="/movies" className="shrink-0">
            <ButtonComponent>전체보기</ButtonComponent>
          </Link>
        </div>

        <div className="flex items-center overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
          <div
            className={`mb-4 grid auto-cols-auto grid-flow-col items-stretch gap-4 p-4 transition-opacity duration-300 ${
              showLoading ? "pointer-events-none opacity-50" : "opacity-100"
            }`}
          >
            {showLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="h-[480px] w-80 animate-pulse rounded-xl bg-text-bg" />
                ))
              : popularData?.results.map((item: MovieItem) => (
                  <MovieCardComponent key={item.id} data={item} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
