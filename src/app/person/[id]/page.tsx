import { getPersonInfo, getPersonMovies } from "@/services/person.service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PersonDetailClient from "./person-detail-client";

export default async function PersonDetailPage({ params }: { params: { id: string } }) {
  const personId = params.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["person-detail", personId],
    queryFn: () => getPersonInfo(personId),
  });
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
