import Image from "next/image";
import { useRouter } from "next/navigation";
import { MovieItem } from "@/types/movie.type";

export default function MovieCardComponent({ data }: { data: MovieItem }) {
  const router = useRouter();
  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "이미지 없음";

  return (
    <div
      onClick={() => router.push(`/movies/${data.id}`)}
      className="flex cursor-pointer flex-col gap-4 rounded-xl bg-white p-4 transition-all duration-300 hover:scale-105"
    >
      <div className="relative h-[400px] w-[300px]">
        <Image
          src={posterUrl}
          className="absolute rounded-xl object-cover"
          fill
          alt={`${data.title} 포스터`}
        />
      </div>

      <div className="flex flex-col items-end gap-4 text-background">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-bold">{data.title}</p>
          <p className="text-sm text-gray-500">{data.release_date}</p>
        </div>
      </div>
    </div>
  );
}
