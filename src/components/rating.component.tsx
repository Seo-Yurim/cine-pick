"use client";

import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingProps {
  rating?: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
  type: "select" | "show";
  defaultValue?: number;
}

export function RatingComponent({ type, defaultValue = 0, rating = 0, setRating }: RatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (value: number) => {
    if (type === "select") {
      setHoverRating(value);
    }
  };

  const handleClick = (value: number) => {
    if (type === "select" && setRating) {
      setRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (type === "select") {
      setHoverRating(0);
    }
  };

  const getStarIcon = (idx: number) => {
    const value = idx + 1;
    const currentRating = type === "select" ? hoverRating || rating : defaultValue;

    if (currentRating >= value) {
      return <FaStar className="h-10 w-10 text-yellow-400" key={idx} />;
    } else if (currentRating >= value - 0.5) {
      return <FaStarHalfAlt className="h-10 w-10 text-yellow-400" key={idx} />;
    } else {
      return <FaRegStar className="h-10 w-10 text-gray-300" key={idx} />;
    }
  };

  return (
    <div className={`flex ${type === "select" ? "cursor-pointer" : ""} gap-4`}>
      {Array.from({ length: 5 }, (_, idx) => {
        const halfValue = idx + 0.5;
        const fullValue = idx + 1;

        return (
          <span key={idx} className="relative inline-block h-10 w-10">
            {type === "select" && (
              <>
                <span
                  className="absolute z-10 h-full w-1/2"
                  onMouseEnter={() => handleMouseEnter(halfValue)}
                  onClick={() => handleClick(halfValue)}
                  onMouseLeave={handleMouseLeave}
                />

                <span
                  className="absolute right-0 z-10 h-full w-1/2"
                  onMouseEnter={() => handleMouseEnter(fullValue)}
                  onClick={() => handleClick(fullValue)}
                  onMouseLeave={handleMouseLeave}
                />
              </>
            )}

            {getStarIcon(idx)}
          </span>
        );
      })}
    </div>
  );
}
