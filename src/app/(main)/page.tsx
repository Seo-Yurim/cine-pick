import { getGenres, getMovies, getNowPlayingMovies } from "@/services/movie.service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import HomeClient from "./home-client";

export default async function HomePage() {
  const queryClient = new QueryClient();

  const today = new Date().toISOString().split("T")[0];

  // SSR 시 React Query 캐시에 데이터를 미리 채워서 클라이언트에서 바로 사용할 수 있도록

  // 영화 장르 목록
  await queryClient.prefetchQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });

  // 인기 영화 목록
  await queryClient.prefetchQuery({
    queryKey: ["movies", { sort_by: "popularity.desc" }],
    queryFn: () => getMovies({ sort_by: "popularity.desc" }),
  });

  // 상영 중인 영화 목록
  await queryClient.prefetchQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: () => getNowPlayingMovies(),
  });

  //최신 개봉 영화 목록
  await queryClient.prefetchQuery({
    queryKey: [
      "movies",
      { sort_by: "primary_release_date.desc", "primary_release_date.lte": today },
    ],
    queryFn: () =>
      getMovies({
        sort_by: "primary_release_date.desc",
        "primary_release_date.lte": today,
        with_origin_country: "KR",
      }),
  });

  // 위에서 prefetch한 데이터를 직렬화(dehydrate)하여 클라이언트에 전달
  const dehydratedState = dehydrate(queryClient);

  // 클라이언트 컴포넌트에서 HydrationBoundary를 통해 SSR 데이터 재사용
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient today={today} />
    </HydrationBoundary>
  );
}
