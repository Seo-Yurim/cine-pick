"use client";

import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { CollectionMovie } from "@/types/collections.type";
import { useGetCollectionDetail, usePatchCollectionMovie } from "@/queries/collections.query";
import { CollectionMovieList } from "./components/collection-movie-list.component";

export default function CollectionDetailPage() {
  const params = useParams();
  const collectionId = params.id as string;

  const deleteMovie = usePatchCollectionMovie();

  const { data: collectionDetail } = useGetCollectionDetail(collectionId);

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">{collectionDetail?.title}</h1>

      {collectionDetail?.movies && collectionDetail?.movies.length > 0 ? (
        <div className="flex flex-col gap-4">
          {collectionDetail?.movies.map((movie: CollectionMovie) => (
            <CollectionMovieList
              key={movie.movieId}
              movieId={movie.movieId}
              onDeleteMovie={(movieId) => {
                const updatedMovies = collectionDetail?.movies.filter(
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
          ))}{" "}
        </div>
      ) : (
        <p>아직 추가한 영화가 없어요.</p>
      )}
    </section>
  );
}
