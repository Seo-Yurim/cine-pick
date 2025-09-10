import {
  ButtonComponent,
  CheckboxComponent,
  LoadingComponent,
  SearchComponent,
  TagComponent,
  ToggleButtonComponent,
} from "@/components";
import { useGenres } from "@/queries/movie.query";
import { useState } from "react";
import { DateValue } from "react-aria-components";
import toast from "react-hot-toast";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { RiFilterFill } from "react-icons/ri";
import { MovieParams } from "@/types/movie.type";
import { DatePickerComponent } from "@/components/date-picker/date-picker.component";

const toggleMenus = [
  { label: <CiGrid41 className="h-8 w-8" />, value: "grid" },
  { label: <CiBoxList className="h-8 w-8" />, value: "list" },
];

export type DatePickerType = {
  start: DateValue | null;
  end: DateValue | null;
};

export default function MoviesHeaderComponent({
  tab,
  onTab,
  onParams,
  onSubmit,
}: {
  tab: string;
  onTab: React.Dispatch<React.SetStateAction<string>>;
  onParams: React.Dispatch<React.SetStateAction<MovieParams>>;
  onSubmit: () => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [genreSelected, setGenreSelected] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DatePickerType>({
    start: null,
    end: null,
  });

  console.log(selectedDate.start?.toString());

  const { data, isLoading, isError } = useGenres();

  const handleTabClick = (tab: string) => {
    onTab(tab);
  };

  // 제거 예정
  if (isLoading) return <LoadingComponent label="로딩 중 ..." isIndeterminate />;
  if (isError) toast.error("데이터를 불러오는 중 오류가 발생했습니다.");

  const tags = ["test1", "test2", "test3"];

  const handlefilterSubmit = () => {
    onParams((prevState) => {
      let newParams = { ...prevState };

      return newParams;
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
          onChange={handleTabClick}
        />
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${isOpen && "bg-point-color"} cursor-pointer rounded-xl border p-2 transition-colors duration-300 hover:bg-point-color`}
        >
          <RiFilterFill className="h-8 w-8" />
        </div>
      </div>

      {isOpen && (
        <div
          className={`flex flex-col items-center rounded-xl bg-point-color p-4 ${isOpen ? "animate-slide-down scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
        >
          <div className={`grid grid-cols-2 gap-4`}>
            <div className="flex flex-col">
              <div className="flex flex-1 flex-col gap-4 p-4">
                <h3 className="text-xl font-medium">장르별 필터링</h3>
                <div className="rounded-xl border p-4">
                  <CheckboxComponent
                    list={data}
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
                <SearchComponent placeholder="인물을 입력해주세요." />
                <TagComponent tags={tags} />
              </div>
            </div>
          </div>
          <ButtonComponent>필터링 적용</ButtonComponent>
        </div>
      )}
    </div>
  );
}
