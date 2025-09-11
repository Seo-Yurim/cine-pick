"use client";

import { LoadingComponent } from "@/components";
import { usePersonInfo, usePersonMovies } from "@/queries/person.query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function PersonDetailPage() {
  const params = useParams();
  const personId = params.id as string;

  const {
    data: personInfo,
    isLoading: isPersonInfoLoading,
    isError: isPersonInfoError,
  } = usePersonInfo(personId);

  const {
    data: personMovies,
    isLoading: isPersonMoviesLoading,
    isError: isPersonMoviesError,
  } = usePersonMovies(personId);

  if (isPersonInfoLoading || isPersonMoviesLoading)
    return <LoadingComponent label="로딩 중 ..." isIndeterminate />;
  if (isPersonInfoError || isPersonMoviesError)
    toast.error("인물 정보를 불러오는 중 오류가 발생했습니다.");

  const profileUrl = personInfo.profile_path
    ? `https://image.tmdb.org/t/p/w500${personInfo.profile_path}`
    : "/default.svg";

  console.log(personMovies);

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-16 px-8 py-12">
      <h1 className="text-2xl font-bold">인물 상세 정보</h1>

      <section className="flex gap-8">
        <div className="relative aspect-[3/4] w-full min-w-[350px] max-w-[624px] shrink-0">
          <Image
            src={profileUrl}
            className="absolute h-full w-full rounded-xl object-contain"
            fill
            priority
            alt="인물 이미지"
            sizes="624px"
          />
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-3 text-xl font-semibold">
          <p>이름: {personInfo.name}</p>
          <p>성별: {personInfo.gender}</p>
          <p>전문분야: {personInfo.known_for_department}</p>
          <p>생년월일: {personInfo.birthday}</p>
          <p>출생지: {personInfo.place_of_birth}</p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <h2 className="text-nowrap text-xl font-semibold">필모그래피</h2>
          <div className="w-full border-b" />
        </div>
        <div className="flex flex-col gap-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
          <div className="mb-4 grid w-full auto-cols-auto grid-flow-col gap-8 p-4">
            {personMovies.cast?.slice(0, 7).map((movie: any) => (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="flex flex-col items-center gap-2 text-nowrap text-center transition-all duration-300 hover:scale-105"
              >
                <div className="relative aspect-[3/4] w-[150px] xl:w-[250px] 2xl:w-[300px]">
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/default.svg"
                    }
                    className="absolute h-full w-full rounded-xl object-cover"
                    fill
                    priority
                    alt={`${movie.name}`}
                    sizes="300px"
                  />
                </div>
                <p className="text-lg font-medium">{movie.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
