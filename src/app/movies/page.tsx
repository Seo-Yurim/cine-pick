"use client";

import { useMovies } from "@/queries/movie.query";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { MovieItem } from "@/types/movie.type";
import LoadingComponent from "@/components/loading.component";
import MovieCardComponent from "@/components/movie-card/movie-card.component";
import ToggleButtonComponent from "@/components/toggle-button/toggle-button.component";

const toggleMenus = [
  { label: <CiGrid41 className="h-8 w-8" />, value: "grid" },
  { label: <CiBoxList className="h-8 w-8" />, value: "list" },
];

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState<string>("grid");

  const { data, isLoading, isError } = useMovies();

  if (isLoading) return <LoadingComponent label="로딩 중 ... " isIndeterminate />;
  if (isError) toast.error("데이터를 불러오는 중 에러가 발생했어요.", { duration: 3000 });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">영화 찾아보기</h1>
        <ToggleButtonComponent
          toggleMenus={toggleMenus}
          activeTab={activeTab}
          onChange={handleTabClick}
        />
      </div>
      <div
        className={
          activeTab === "grid"
            ? "grid grid-cols-4 gap-4 xl:gap-x-12 xl:gap-y-8"
            : "flex flex-col gap-4"
        }
      >
        {data.results.map((result: MovieItem) => (
          <MovieCardComponent key={result.id} data={result} type={activeTab} />
        ))}
      </div>
    </main>
  );
}
