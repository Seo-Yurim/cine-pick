import { getPersonIds } from "@/services/search.service";
import { useState } from "react";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { RiFilterFill } from "react-icons/ri";
import { MovieParams } from "@/types/movie.type";
import { useModalStore } from "@/stores/modal.store";
import { useGenres } from "@/queries/movie.query";
import {
  ButtonComponent,
  CheckboxComponent,
  DatePickerComponent,
  SearchComponent,
  TagComponent,
  ToggleButtonComponent,
} from "@/components";

const toggleMenus = [
  { label: <CiGrid41 className="h-8 w-8" />, value: "grid" },
  { label: <CiBoxList className="h-8 w-8" />, value: "list" },
];

export interface DatePickerType {
  start: Date | null;
  end: Date | null;
}

interface MoviesHeaderProps {
  title: () =>
    | "🎬 전체 영화 목록"
    | "💰 흥행한 영화 목록"
    | "🆕 최신 국내 개봉 영화 목록"
    | "🍿 영화 목록";
  tab: string;
  onTab: (tab: string) => void;
  onParams: React.Dispatch<React.SetStateAction<MovieParams>>;
  sort: string | null;
}

export default function MoviesHeaderComponent({
  title,
  tab,
  onTab,
  onParams,
  sort,
}: MoviesHeaderProps) {
  const { modals, toggleModal } = useModalStore();
  const [genreSelected, setGenreSelected] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DatePickerType>({
    start: null,
    end: null,
  });
  const [tagList, setTagList] = useState<string[]>([]);

  const { data: genres } = useGenres();

  const handleFilterSubmit = async () => {
    const personIds = await getPersonIds(tagList);

    onParams({
      sort_by: sort,
      with_genres: genreSelected.join("|"),
      with_people: personIds.join("|"),
      "primary_release_date.gte": selectedDate.start?.toString(),
      "primary_release_date.lte": selectedDate.end?.toString(),
    });
  };

  const handleFilterReset = () => {
    onParams({
      sort_by: sort,
      with_genres: "",
      with_people: "",
      "primary_release_date.gte": "",
      "primary_release_date.lte": "",
    });

    setGenreSelected([]);
    setSelectedDate({ start: null, end: null });
    setTagList([]);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between gap-8">
        <h1 className="text-nowrap text-2xl font-bold">{title()}</h1>
        <SearchComponent placeholder="원하는 영화를 찾아보세요!" />
        <ToggleButtonComponent
          toggleMenus={toggleMenus}
          activeTab={tab}
          onChange={(tab) => onTab(tab)}
        />

        <div
          onClick={() => toggleModal("filterMenu")}
          className={`${modals.filterMenu && "bg-point-color"} cursor-pointer rounded-xl border p-2 transition-colors duration-300 hover:bg-point-color`}
        >
          <RiFilterFill className="h-8 w-8" />
        </div>
      </div>

      {modals.filterMenu && (
        <div
          className={`flex flex-col items-center rounded-xl bg-point-color p-4 ${modals.filterMenu ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
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

          <div className="flex w-full max-w-[600px] items-center gap-4">
            <ButtonComponent
              onPress={handleFilterSubmit}
              className="flex-1 rounded-xl bg-white text-point-color shadow-xl hover:bg-white/30 hover:text-white"
            >
              필터링 적용
            </ButtonComponent>
            <ButtonComponent
              onPress={handleFilterReset}
              className="flex-1 rounded-xl bg-text-bg/70 shadow-xl hover:bg-text-bg/30"
            >
              필터링 초기화
            </ButtonComponent>
          </div>
        </div>
      )}
    </section>
  );
}
