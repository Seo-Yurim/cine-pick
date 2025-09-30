"use client";

import { SwiperSlide } from "swiper/react";
import { useMemo, useState } from "react";
import { MovieItem } from "@/types/movie.type";
import { useGenres, useMovies } from "@/queries/movie.query";
import { MovieCardComponent, Slider } from "@/components";
import { SelectComponent } from "@/components/select/select.component";
import { SliderSection } from "../../../components/slider-section/slider-section.component";
import { HeroSection } from "./hero-section.component";

export default function Hydrated() {
  const today = new Date().toISOString().split("T")[0];
  const [activeTab, setActiveTab] = useState<{ label: string; value: string }>({
    label: "전체",
    value: "",
  });

  const { data: genres } = useGenres();
  const { data: popularData } = useMovies({ sort_by: "popularity.desc" });
  const { data: popularDataWithGenres } = useMovies({
    sort_by: "popularity.desc",
    with_genres: activeTab.value,
  });
  const { data: newData } = useMovies({
    sort_by: "primary_release_date.desc",
    "primary_release_date.lte": today,
  });

  const genresList = useMemo(() => {
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
      <HeroSection popularData={popularData?.results?.slice(0, 3)} genres={genres?.genres} />
      <SliderSection
        title="인기 영화"
        controls={
          genresList.length > 0 && (
            <SelectComponent
              value={activeTab}
              options={genresList}
              onSelect={(option) => setActiveTab(option)}
            />
          )
        }
      >
        <Slider>
          {popularDataWithGenres?.results.map((data: MovieItem) => (
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
    </>
  );
}
