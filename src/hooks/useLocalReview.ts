import { useAuthStore } from "@/stores/auth.store";
import { LocalReview } from "@/types/movie.type";

export function useLocalReviews(movieId: number) {
  const { accountId } = useAuthStore();
  const key = "allReviews";

  const getAllReviews = (): LocalReview[] => {
    const raw = localStorage.getItem(key);

    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return parsed[movieId] || [];
  };

  const getAllMyReviews = (): LocalReview[] => {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = raw ? (JSON.parse(raw) as { [movieId: string]: LocalReview[] }) : {};
    const allReviews: LocalReview[] = [];

    Object.values(parsed).forEach((reviews: LocalReview[]) => {
      reviews.forEach((review) => {
        if (review.account_id === accountId) {
          allReviews.push(review);
        }
      });
    });

    return allReviews;
  };

  const saveReviews = (reviews: LocalReview[]) => {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[movieId] = reviews;
    localStorage.setItem(key, JSON.stringify(parsed));
  };

  const addReview = (review: Omit<LocalReview, "id" | "createdAt">) => {
    const reviews = getAllReviews();
    const newReview: LocalReview = {
      ...review,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      account_id: accountId!,
    };
    saveReviews([...reviews, newReview]);
  };

  const updateReview = (reviewId: string, updated: Partial<LocalReview>) => {
    const reviews = getAllReviews();
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId && review.account_id === accountId
        ? { ...review, ...updated, editedAt: new Date().toISOString() }
        : review,
    );
    saveReviews(updatedReviews);
  };

  const deleteReview = (reviewId: string) => {
    const reviews = getAllReviews();
    const filtered = reviews.filter(
      (review) => review.id !== reviewId || review.account_id !== accountId,
    );
    saveReviews(filtered);
  };

  return {
    getAllReviews,
    getAllMyReviews,
    addReview,
    updateReview,
    deleteReview,
  };
}
