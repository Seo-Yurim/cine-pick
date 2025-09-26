"use client";

import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { CollectionMovie } from "@/types/collections.type";
import { useGetCollectionDetail, usePatchCollectionMovie } from "@/queries/collections.query";
import { CollectionMovieLIst } from "./components/collection-movie-list.component";

export default function CollectionDetailPage() {
  const params = useParams();
  const collectionId = params.id as string;

  const deleteMovie = usePatchCollectionMovie();

  const { data: collectionDetail } = useGetCollectionDetail(collectionId);

  const collectionMovies = collectionDetail?.movies ?? [];

  return (
    <section className="flex items-center gap-8">
      {collectionMovies && collectionMovies.length > 0 ? (
        collectionMovies.map((movie: CollectionMovie) => (
          <CollectionMovieLIst
            key={movie.movieId}
            movieId={movie.movieId}
            onDeleteMovie={(movieId) => {
              const updatedMovies = collectionMovies.filter(
                (movie: CollectionMovie) => movie.movieId !== movieId,
              );

              deleteMovie.mutate(
                { collectionId, collectionMovie: updatedMovies },
                {
                  onSuccess: () => {
                    toast.success("해당 영화를 삭제했습니다.");
                  },
                },
              );
            }}
          />
        ))
      ) : (
        <p>아직 추가한 영화가 없어요.</p>
      )}
    </section>
  );
}
