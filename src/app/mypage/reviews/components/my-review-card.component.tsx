import { ReviewItem } from "@/types/reviews.type";
import { useMovieDetail } from "@/queries/movie.query";
import { LoadingComponent, MovieCardComponent } from "@/components";
import { RatingComponent } from "@/components/rating.component";

export function MyReviewCard({
  movieId,
  reviewList,
}: {
  movieId: number;
  reviewList: ReviewItem[];
}) {
  const {
    data: movieDetail,
    isLoading: isMovieDetailLoading,
    isError: isMovieDetailError,
  } = useMovieDetail(movieId);

  if (isMovieDetailLoading) return <LoadingComponent label="로딩 중 ... " isIndeterminate />;
  if (isMovieDetailError || !movieDetail) return <p>에러 발생</p>;

  const filteredReviewList = reviewList.filter((review) => review.movieId === movieId);

  return (
    <div className="flex flex-col gap-8">
      <MovieCardComponent data={movieDetail} />

      {filteredReviewList.map((review) => (
        <div key={review.id} className="flex flex-col gap-6 border-t p-4 last:border-y">
          <RatingComponent type="show" defaultValue={review.rating} />
          <p className="text-nowrap text-xl font-bold">작성한 내용</p>
          <p className="rounded-xl bg-foreground/20 p-8 text-lg font-medium">{review.content}</p>
        </div>
      ))}
    </div>
  );
}
