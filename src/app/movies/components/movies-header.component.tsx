import { useGenres } from "@/queries/movie.query";
import toast from "react-hot-toast";
import { CiBoxList, CiGrid41 } from "react-icons/ci";
import { RiFilterFill } from "react-icons/ri";
import CheckboxComponent from "@/components/checkbox/checkbox.component";
import LoadingComponent from "@/components/loading.component";
import SearchComponent from "@/components/search/search.component";
import TagComponent from "@/components/tag/tag.component";
import ToggleButtonComponent from "@/components/toggle-button/toggle-button.component";

const toggleMenus = [
  { label: <CiGrid41 className="h-8 w-8" />, value: "grid" },
  { label: <CiBoxList className="h-8 w-8" />, value: "list" },
];

export default function MoviesHeaderComponent({
  tab,
  onTab,
}: {
  tab: string;
  onTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { data, isLoading, isError } = useGenres();

  const handleTabClick = (tab: string) => {
    onTab(tab);
  };

  if (isLoading) return <LoadingComponent label="로딩 중 ..." isIndeterminate />;
  if (isError) toast.error("데이터를 불러오는 중 오류가 발생했습니다.");

  const tags = ["test1", "test2", "test3"];

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
        <div className="rounded-xl border p-2">
          <RiFilterFill className="h-8 w-8" />
        </div>
      </div>

      <div className="flex gap-4 rounded-xl bg-point-color p-4">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h3 className="text-xl font-medium">장르별 필터링</h3>
          <div className="rounded-xl border p-4">
            <CheckboxComponent list={data} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <h3 className="text-xl font-medium">인물 필터링</h3>
          <div className="rounded-xl border p-4">
            <TagComponent tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
