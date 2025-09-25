"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFolderPlus } from "react-icons/fa";
import { CollectionList } from "@/types/collections.type";
import { MovieCreditResponse, MovieDetailItem, MovieGenres } from "@/types/movie.type";
import { useAuthStore } from "@/stores/auth.store";
import { useGetCollectionList, usePatchCollectionMovie } from "@/queries/collections.query";
import { useGetFavoriteMovie } from "@/queries/favorites.query";
import { useGetWatchedDetail } from "@/queries/watches.query";
import { LoadingComponent, RatingComponent } from "@/components";
import { FavoriteMovieComponent } from "@/components/favorite-movie.component";
import { MenuComponent } from "@/components/menu.component";
import { PersonListComponent } from "../index";
import { WatchedControlComponent } from "./watched.compoent";

const statusMapping: Record<string, string> = {
  Rumored: "제작 미정",
  Planned: "제작 예정",
  "In Production": "제작 진행 중",
  "Post Production": "편집 및 후반 작업 진행 중",
  Released: "공식 개봉",
  Canceled: "제작 취소",
};

interface MovieInfoProps {
  movieData: MovieDetailItem;
  creditData: MovieCreditResponse;
  rating: number;
}

export function MovieInfoSection({ movieData, creditData, rating }: MovieInfoProps) {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const addCollectionMovie = usePatchCollectionMovie();

  const {
    data: favoriteMovie,
    isLoading: isFavoriteLoading,
    isError: isFavoriteError,
  } = useGetFavoriteMovie(userId, movieData.id);

  const {
    data: collectionList,
    isLoading: isCollectionLoading,
    isError: isCollectionError,
  } = useGetCollectionList(userId);

  const {
    data: watchedMovie,
    isLoading: isWatchedLoading,
    isError: isWatchedError,
  } = useGetWatchedDetail(userId, movieData.id);

  if (isFavoriteLoading || isCollectionLoading || isWatchedLoading) return <LoadingComponent />;
  if (isFavoriteError || isCollectionError || isWatchedError)
    return toast.error("데이터를 불러오는 중 오류가 발생했습니다!");

  const handleSelectCollection = (collection: CollectionList) => {
    if (!collection) return toast.error("영화를 추가할 컬렉션을 선택해주세요!");

    const alreadyExists = collection.movies?.some((movie) => movie.movieId === movieData.id);

    if (alreadyExists) {
      return toast.error("이미 컬렉션에 추가된 영화입니다.");
    }

    const collectionMovie = {
      collectionId: collection.id,
      movieId: movieData.id,
    };

    const updatedMovies = [...collection.movies, collectionMovie];

    addCollectionMovie.mutate(
      { collectionId: collection.id, collectionMovie: updatedMovies },
      {
        onSuccess: () => {
          toast.success("컬렉션에 영화를 추가했어요!");
        },
      },
    );
  };

  return (
    <section className="flex w-full flex-col gap-8">
      <div className="flex items-center gap-8">
        <h1 className="text-nowrap text-3xl font-bold">{movieData.title}</h1>
        <div className="w-full border-b" />
      </div>

      <div className="flex min-w-0 justify-between gap-8 max-lg:flex-col max-lg:items-center">
        <div className="relative aspect-[3/4] w-full min-w-[350px] max-w-[624px] shrink-0">
          <Image
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                : "/default.svg"
            }
            className="absolute h-full w-full rounded-xl object-contain"
            fill
            priority
            alt={`${movieData.title} 포스터`}
            sizes="624px"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-8 text-lg">
          <p>{movieData.overview}</p>

          <div className="flex items-center gap-4">
            <p className="rounded-xl border px-4 py-1">{movieData.release_date}</p>
            <div className="flex items-center gap-2 rounded-xl border px-4 py-1">
              {movieData.genres.map((genre: MovieGenres) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <p className="rounded-xl border px-4 py-1">{movieData.runtime}분</p>
            <p className="rounded-xl border px-4 py-1">{statusMapping[movieData.status]}</p>
          </div>

          <div className="flex items-center gap-4">
            <FavoriteMovieComponent
              defaultValue={!user ? null : favoriteMovie}
              movieId={movieData.id}
            />

            <MenuComponent
              isOpen={isMenuOpen}
              onOpenChange={() => setIsMenuOpen(!isMenuOpen)}
              btnIcon={<FaFolderPlus className="h-6 w-6" />}
              menuList={collectionList || []}
              onSelectCollection={handleSelectCollection}
            />

            <WatchedControlComponent
              defaultValue={!user ? null : watchedMovie}
              movieId={movieData.id}
            />

            <p className="text-nowrap rounded-xl bg-point-color px-4 py-1 font-medium">평점</p>
            <RatingComponent type="show" defaultValue={rating} />
            <p>{rating}점</p>
          </div>

          <div className="flex flex-col gap-4">
            <PersonListComponent type="cast" creditData={creditData.cast} />
            <PersonListComponent type="crew" creditData={creditData.crew} />
          </div>
        </div>
      </div>
    </section>
  );
}
