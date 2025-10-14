import { getGenres } from "@/services/movie.service";
import { getPersonInfo, getPersonMovies } from "@/services/person.service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PersonDetailClient from "./person-detail-client";

export default async function PersonDetailPage({ params }: { params: { id: string } }) {
  const personId = params.id;

  const queryClient = new QueryClient();

  // 영화 장르 목록
  await queryClient.prefetchQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });

  // 인물 정보
  await queryClient.prefetchQuery({
    queryKey: ["person-detail", personId],
    queryFn: () => getPersonInfo(personId),
  });

  // 인물이 참여한 영화 목록
  await queryClient.prefetchQuery({
    queryKey: ["person-movies", personId],
    queryFn: () => getPersonMovies(personId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PersonDetailClient personId={personId} />
    </HydrationBoundary>
  );
}
