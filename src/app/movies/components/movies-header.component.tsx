import { CiBoxList, CiGrid41 } from "react-icons/ci";
import SearchComponent from "@/components/search/search.component";
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
  const handleTabClick = (tab: string) => {
    onTab(tab);
  };

  return (
    <div>
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">영화 찾아보기</h1>
        <ToggleButtonComponent
          toggleMenus={toggleMenus}
          activeTab={tab}
          onChange={handleTabClick}
        />
      </div>
      <div className="flex items-center justify-between">
        <SearchComponent placeholder="원하는 영화를 찾아보세요!" />
      </div>
    </div>
  );
}
