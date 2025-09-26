import { getMovies } from "@/services/movie.service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Hydrated from "./_components/hydrated";

export default async function HomePage() {
  const queryClient = new QueryClient();

  const today = new Date().toISOString().split("T")[0];

  await queryClient.prefetchQuery({
    queryKey: ["movies", { sort_by: "popularity.desc" }],
    queryFn: () => getMovies({ sort_by: "popularity.desc" }),
  });

  await queryClient.prefetchQuery({
    queryKey: [
      "movies",
      { sort_by: "primary_release_date.desc", "primary_release_date.lte": today },
    ],
    queryFn: () =>
      getMovies({
        sort_by: "primary_release_date.desc",
        "primary_release_date.lte": today,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Hydrated />
    </HydrationBoundary>
  );
}
