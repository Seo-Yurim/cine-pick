import { getPersonIds } from "@/services/search.service";
import { useState } from "react";
import { DateValue } from "react-aria-components";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { RiFilterFill } from "react-icons/ri";
import { MovieParams } from "@/types/movie.type";
import { useModalStore } from "@/stores/modal.store";
import { useGenres } from "@/queries/movie.query";
import {
  ButtonComponent,
  CheckboxComponent,
  SearchComponent,
  TagComponent,
  ToggleButtonComponent,
} from "@/components";
import { DatePickerComponent } from "@/components/date-picker/date-picker.component";

// constants
const sortOptions = [
  { label: "인기 내림차순", value: "popularity.desc" },
  { label: "인기 오름차순", value: "popularity.asc" },
  { label: "출시일 내림차순", value: "primary_release_date.desc" },
  { label: "출시일 오름차순", value: "primary_release_date.asc" },
  { label: "제목 내림차순", value: "title.desc" },
  { label: "제목 오름차순", value: "title.asc" },
];

const toggleMenus = [
  { label: <CiGrid41 className="h-8 w-8" />, value: "grid" },
  { label: <CiBoxList className="h-8 w-8" />, value: "list" },
];

export type DatePickerType = {
  start: DateValue | null;
  end: DateValue | null;
};

interface MoviesHeaderProps {
  tab: string;
  onTab: React.Dispatch<React.SetStateAction<string>>;
  onParams: React.Dispatch<React.SetStateAction<MovieParams>>;
}

export default function MoviesHeaderComponent({ tab, onTab, onParams }: MoviesHeaderProps) {
  const { modals, toggleModal } = useModalStore();
  const [sortOption, setSortOption] = useState<{ label: string; value: string }>(sortOptions[0]);
  const [genreSelected, setGenreSelected] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DatePickerType>({
    start: null,
    end: null,
  });
  const [tagList, setTagList] = useState<string[]>([]);

  const { data: genres } = useGenres();

  const handlefilterSubmit = async () => {
    const personIds = await getPersonIds(tagList);

    onParams({
      sort_by: sortOption.value,
      with_genres: genreSelected.toString(),
      with_people: personIds.toString(),
      "primary_release_date.gte": selectedDate.start?.toString(),
      "primary_release_date.lte": selectedDate.end?.toString(),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-8">
        <h1 className="text-nowrap text-2xl font-bold">영화 찾아보기</h1>
        <SearchComponent placeholder="원하는 영화를 찾아보세요!" />
        <ToggleButtonComponent
          toggleMenus={toggleMenus}
          activeTab={tab}
          onChange={(tab) => onTab(tab)}
        />

        <div className="relative flex flex-col items-center text-nowrap rounded-xl border p-1">
          <ButtonComponent onClick={() => toggleModal("sortMenu")}>
            {sortOption.label}
          </ButtonComponent>

          {modals.sortMenu && (
            <div className="absolute top-full z-50 mt-2 flex flex-col gap-2 rounded-xl border bg-black p-4 text-lg">
              {sortOptions.map((option) => (
                <ButtonComponent
                  key={option.value}
                  onClick={() => {
                    setSortOption(option);
                    onParams((prev) => ({
                      ...prev,
                      sort_by: option.value,
                    }));
                  }}
                  className={`${sortOption === option && "text-point-color"} hover:bg-white/50`}
                >
                  {option.label}
                </ButtonComponent>
              ))}
            </div>
          )}
        </div>

        <div
          onClick={() => toggleModal("filterMenu")}
          className={`${modals.filterMenu && "bg-point-color"} cursor-pointer rounded-xl border p-2 transition-colors duration-300 hover:bg-point-color`}
        >
          <RiFilterFill className="h-8 w-8" />
        </div>
      </div>

      {modals.filterMenu && (
        <div
          className={`flex flex-col items-center rounded-xl bg-point-color p-4 ${modals.filterMenu ? "scale-100 animate-slide-down opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
        >
          <div className={`grid grid-cols-2 gap-4`}>
            <div className="flex flex-col">
              <div className="flex flex-1 flex-col gap-4 p-4">
                <h3 className="text-xl font-medium">장르별 필터링</h3>
                <div className="rounded-xl border p-4">
                  <CheckboxComponent
                    list={genres}
                    selected={genreSelected}
                    onSelected={setGenreSelected}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-4">
                <h3 className="text-xl font-medium">개봉일 필터링</h3>
                <div className="rounded-xl border p-4">
                  <DatePickerComponent onSelectedDate={setSelectedDate} />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-4">
              <h3 className="text-xl font-medium">인물 필터링</h3>
              <div className="flex h-full flex-col flex-wrap items-stretch gap-4 rounded-xl border p-4">
                <TagComponent tagList={tagList} setTagList={setTagList} />
              </div>
            </div>
          </div>
          <ButtonComponent onPress={handlefilterSubmit}>필터링 적용</ButtonComponent>
        </div>
      )}
    </div>
  );
}
