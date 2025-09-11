import { IoPersonCircleSharp } from "react-icons/io5";
import { ReviewItem } from "@/types/movie.type";

export function ReviewListComponent({ reviewData = [] }: { reviewData: ReviewItem[] }) {
  return (
    <div className="flex w-full flex-col">
      {reviewData.map((review) => (
        <div key={review.id} className="flex flex-col gap-4 border-t p-4 last:border-y">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-1 text-background">
              <IoPersonCircleSharp className="h-8 w-8" />
              <p>{review.author}</p>
            </div>
            <p>{review.author_details.rating}</p>
          </div>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}
