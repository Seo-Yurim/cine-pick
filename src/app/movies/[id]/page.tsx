import { getMovieCredits, getMovieDetail } from "@/services/movie.service";
import { getReivews } from "@/services/reviews.service";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import MovieDetailClient from "./movie-detail-client";

export default async function MoviesDetailPage({ params }: { params: { id: string } }) {
  const movieId = Number(params.id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetail(movieId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["movie-credit", movieId],
    queryFn: () => getMovieCredits(movieId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["reviews"],
    queryFn: () => getReivews(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MovieDetailClient movieId={movieId} />
    </HydrationBoundary>
  );
}
