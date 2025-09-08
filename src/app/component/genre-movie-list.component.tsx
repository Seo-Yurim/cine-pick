import { useMovies } from "@/queries/movie.query";
import { MovieItem } from "@/types/movie.type";
import ButtonComponent from "@/components/button/button.component";
import MovieCardComponent from "@/components/movie-card/movie-card.component";
import ToggleButtonComponent from "@/components/toggle-button/toggle-button.component";

const toggleMenus = ["전체", "로맨스", "코미디", "액션", "스릴러", "공포"];

export function GenreMovieListComponent() {
  const {
    data: genresData,
    isLoading: genresLoading,
    isError: genresErr,
  } = useMovies({
    sort_by: "popularity.desc",
  });

  if (genresLoading) return <div>loading .. </div>;
  if (genresErr) return <div>error .. </div>;

  return (
    <section className="flex p-6">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col justify-center gap-4">
        <div className="flex items-center justify-between text-nowrap">
          <div className="flex items-center gap-8">
            <h2 className="text-3xl font-bold">장르별 추천 영화</h2>
            <ToggleButtonComponent toggleMenus={toggleMenus} />
          </div>
          <ButtonComponent>전체보기</ButtonComponent>
        </div>

        <div className="flex items-center overflow-x-auto">
          <div className="mb-4 grid w-full auto-cols-auto grid-flow-col items-stretch gap-4 p-4">
            {genresData.results.map((item: MovieItem) => (
              <MovieCardComponent key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
