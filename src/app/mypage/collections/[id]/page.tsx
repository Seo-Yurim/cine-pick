"use client";

import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { CollectionMovie } from "@/types/collections.type";
import { useGetCollectionDetail } from "@/queries/collections.query";
import { LoadingComponent } from "@/components";
import { CollectionMovieLIst } from "./components/collection-movie-list.component";

export default function CollectionDetailPage() {
  const params = useParams();
  const collectionId = params.id as string;

  const {
    data: collectionDetail,
    isLoading: isCollectionDetailLoading,
    isError: isCollectionDetailError,
  } = useGetCollectionDetail(collectionId);

  if (isCollectionDetailLoading || !collectionDetail) return <LoadingComponent isIndeterminate />;
  if (isCollectionDetailError) return toast.error("데이터를 불러오는 중 오류가 발생했습니다.");

  const collectionMovies = collectionDetail.movies;

  return (
    <section className="flex items-center gap-8">
      {collectionMovies && collectionMovies.length > 0 ? (
        collectionMovies.map((movie: CollectionMovie) => (
          <CollectionMovieLIst key={movie.movieId} movieId={movie.movieId} />
        ))
      ) : (
        <p>아직 추가한 영화가 없어요.</p>
      )}
    </section>
  );
}
