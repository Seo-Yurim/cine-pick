import Image from "next/image";
import Link from "next/link";
import { MovieCast, MovieCrew } from "@/types/movie.type";

interface PersonCardProps {
  type: "cast" | "crew";
  creditData: MovieCast | MovieCrew;
}

export function PersonCard({ type, creditData }: PersonCardProps) {
  return (
    <Link
      href={`/person/${creditData.id}`}
      className="flex flex-col items-center gap-2 text-nowrap text-center transition-all duration-300 hover:scale-105"
    >
      <div className="relative aspect-[3/4] w-[100px] xl:w-[120px] 2xl:w-[200px]">
        <Image
          src={
            creditData.profile_path
              ? `https://image.tmdb.org/t/p/w500${creditData.profile_path}`
              : "/default.svg"
          }
          className="absolute h-full w-full rounded-xl object-cover"
          fill
          priority
          alt={creditData.name}
          sizes="200px"
        />
      </div>
      <p className="text-sm">{creditData.name}</p>
      <p className="text-xs">
        {type === "cast" ? (creditData as MovieCast).character : (creditData as MovieCrew).job}
      </p>
    </Link>
  );
}
