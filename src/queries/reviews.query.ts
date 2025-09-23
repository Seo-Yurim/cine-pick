import {
  deleteReview,
  getReivews,
  getReviewDetail,
  patchReview,
  postReview,
} from "@/services/reviews.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ReviewItem } from "@/types/reviews.type";
import { queryClient } from "./query-client";

// 리뷰 목록
export function useGetReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => getReivews(),
  });
}

// 리뷰 상세 정보
export function useGetReviewDetail(reviewId: string) {
  return useQuery({
    queryKey: ["reviews", reviewId],
    queryFn: () => getReviewDetail(reviewId),
    enabled: !!reviewId,
  });
}

// 리뷰 작성
export function usePostReview() {
  return useMutation({
    mutationFn: (reviewData: Omit<ReviewItem, "id">) => postReview(reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      toast.success("리뷰를 작성했습니다.");
    },
    onError: (err) => {
      console.error("리뷰 작성 실패: ", err.message);
      toast.error("리뷰 작성 중 문제가 발생하였습니다!");
    },
  });
}

// 리뷰 수정
export function usePatchReview() {
  return useMutation({
    mutationFn: ({
      reviewId,
      reviewData,
    }: {
      reviewId: string;
      reviewData: Omit<ReviewItem, "id" | "user">;
    }) => patchReview(reviewId, reviewData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.reviewId] });
      toast.success("리뷰를 수정했습니다.");
    },
    onError: (err) => {
      console.error("리뷰 수정 실패: ", err.message);
      toast.error("리뷰 수정 중 문제가 발생하였습니다!");
    },
  });
}

// 리뷰 삭제
export function useDeleteReview() {
  return useMutation({
    mutationFn: ({ reviewId }: { reviewId: string }) => deleteReview(reviewId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.reviewId] });
      toast.success("리뷰를 삭제했습니다.");
    },
    onError: (err) => {
      console.error("리뷰 삭제 실패: ", err.message);
      toast.error("리뷰 삭제 중 문제가 발생하였습니다!");
    },
  });
}
