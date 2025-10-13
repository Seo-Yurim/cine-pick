import { getGenres } from "@/services/movie.service";
import { getSearchResult } from "@/services/search.service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import SearchResultClient from "./search-result.component";

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query ?? "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchResult(query),
  });
  await queryClient.prefetchQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchResultClient query={query} />
    </HydrationBoundary>
  );
}
