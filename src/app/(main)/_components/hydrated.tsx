"use client";

import { SwiperSlide } from "swiper/react";
import { useMemo, useState } from "react";
import { MovieItem } from "@/types/movie.type";
import { useGenres, useMovies } from "@/queries/movie.query";
import { MovieCardComponent, Slider, ToggleButtonComponent } from "@/components";
import { SliderSection } from "../../../components/slider-section/slider-section.component";

export default function Hydrated() {
  const today = new Date().toISOString().split("T")[0];
  const [activeTab, setActiveTab] = useState<string>("");

  const { data: genres } = useGenres();
  const { data: popularData } = useMovies({ sort_by: "popularity.desc" });
  const { data: newData } = useMovies({
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": today,
  });
  const { data: genresData } = useMovies({
    sort_by: "popularity.desc",
    with_genres: activeTab,
  });

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

  return (
    <>
      <SliderSection title="인기 영화">
        <Slider>
          {popularData.results.map((data: MovieItem) => (
            <SwiperSlide key={data.id} className="p-4">
              <MovieCardComponent data={data} />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>

      <SliderSection title="최신 영화">
        <Slider>
          {newData.results.map((data: MovieItem) => (
            <SwiperSlide key={data.id} className="p-4">
              <MovieCardComponent data={data} />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>

      <SliderSection
        title="장르별 인기 영화"
        controls={
          <ToggleButtonComponent
            toggleMenus={toggleMenus}
            activeTab={activeTab}
            onChange={(tab: string) => setActiveTab(tab)}
          />
        }
      >
        <Slider>
          {genresData?.results.map((data: MovieItem) => (
            <SwiperSlide key={data.id} className="p-4">
              <MovieCardComponent data={data} />
            </SwiperSlide>
          ))}
        </Slider>
      </SliderSection>
    </>
  );
}
