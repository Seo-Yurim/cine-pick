import { MovieCardComponent } from "@/components";
import { useMovieDetail } from "@/queries/movie.query";
import { ReviewItem } from "@/types/movie.type";
import { RatingComponent } from "@/components/rating.component";

export function MyReviewCard({
  movieId,
  reviewList,
}: {
  movieId: string;
  reviewList: ReviewItem[];
}) {
  const {
    data: movieDetail,
    isLoading: isMovieDetailLoading,
    isError: isMovieDetailError,
  } = useMovieDetail(movieId);

  if (isMovieDetailLoading) return <p>로딩 중...</p>;
  if (isMovieDetailError || !movieDetail) return <p>에러 발생</p>;

  return (
    <div className="flex flex-col gap-8">
      <MovieCardComponent data={movieDetail} />
      {reviewList.map((review) => (
        <div key={review.id} className="flex flex-col gap-6 border-t p-4 last:border-y">
          <RatingComponent type="show" defaultValue={Number(review.rating)} />
          <p className="text-nowrap text-xl font-bold">작성한 내용</p>
          <p className="rounded-xl bg-foreground/20 p-8 text-lg font-medium">{review.content}</p>
        </div>
      ))}
    </div>
  );
}
