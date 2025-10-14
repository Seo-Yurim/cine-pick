export const sortOptions = [
  { label: "인기 내림차순", value: "popularity.desc" },
  { label: "인기 오름차순", value: "popularity.asc" },
  { label: "출시일 내림차순", value: "primary_release_date.desc" },
  { label: "출시일 오름차순", value: "primary_release_date.asc" },
  { label: "제목 내림차순", value: "title.desc" },
  { label: "제목 오름차순", value: "title.asc" },
];

// 영화 개봉 상태
export const statusMapping: Record<string, string> = {
  Rumored: "제작 미정",
  Planned: "제작 예정",
  "In Production": "제작 진행 중",
  "Post Production": "편집 및 후반 작업 진행 중",
  Released: "공식 개봉",
  Canceled: "제작 취소",
};
