import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MovieCast, MovieCrew } from "@/types/movie.type";

const DATA_SIZE = 7;

export function PersonListComponent({
  type,
  creditData,
}: {
  type: "cast" | "crew";
  creditData: MovieCast[] | MovieCrew[];
}) {
  const [visibleCount, setVisibleCount] = useState<number>(DATA_SIZE);

  const handleLoadData = () => {
    setVisibleCount((prev) => prev + DATA_SIZE);
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <p className="text-nowrap text-lg font-medium">출연진</p>
        <div className="w-full border-b" />
      </div>
      <div className="flex flex-col gap-2 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground">
        <div className="mb-4 grid w-full auto-cols-auto grid-flow-col gap-8 p-2">
          {creditData.slice(0, visibleCount).map((credit: MovieCast | MovieCrew) => (
            <Link
              href={`/person/${credit.id}`}
              key={credit.credit_id}
              className="flex flex-col items-center gap-2 text-nowrap text-center transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-[3/4] w-[100px] xl:w-[120px] 2xl:w-[200px]">
                <Image
                  src={
                    credit.profile_path
                      ? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
                      : "/default.svg"
                  }
                  className="absolute h-full w-full rounded-xl object-cover"
                  fill
                  priority
                  alt={credit.name}
                  sizes="200px"
                />
              </div>
              <p className="text-sm">{credit.name}</p>
              <p className="text-xs">
                {type === "cast" ? (credit as MovieCast).character : (credit as MovieCrew).job}
              </p>
            </Link>
          ))}

          {visibleCount < creditData.length && (
            <FaCircleArrowRight
              onClick={handleLoadData}
              className="my-auto h-16 w-16 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}
