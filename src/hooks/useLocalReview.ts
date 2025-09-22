import { useAuthStore } from "@/stores/auth.store";
import { LocalReview } from "@/types/movie.type";

export function useLocalReviews(movieId: number) {
  const { accountId } = useAuthStore();
  const key = "allReviews";

  // 모든 리뷰 가져오기
  const getAllReviews = (): LocalReview[] => {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return parsed[movieId] || [];
  };

  // 내가 쓴 전체 리뷰 가져오기
  const getAllMyReviews = (): LocalReview[] => {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = raw ? (JSON.parse(raw) as { [movieId: string]: LocalReview[] }) : {};

    return Object.values(parsed)
      .flat()
      .filter((review) => review.account_id === accountId);
  };

  // 리뷰 저장
  const saveReviews = (reviews: LocalReview[]) => {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[movieId] = reviews;
    localStorage.setItem(key, JSON.stringify(parsed));
  };

  // 리뷰 추가
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

  // 리뷰 수정
  const updateReview = (reviewId: string, updated: Partial<LocalReview>) => {
    const reviews = getAllReviews();
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId && review.account_id === accountId
        ? { ...review, ...updated, editedAt: new Date().toISOString() }
        : review,
    );

    saveReviews(updatedReviews);
  };

  // 리뷰 삭제
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
