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

  const getStarIcon = (index: number) => {
    const value = (index + 1) * 2;
    const currentRating = type === "select" ? hoverRating || rating : defaultValue;

    if (currentRating >= value) {
      return <FaStar className="h-10 w-10 text-yellow-400" key={index} />;
    } else if (currentRating >= value - 1) {
      return <FaStarHalfAlt className="h-10 w-10 text-yellow-400" key={index} />;
    } else {
      return <FaRegStar className="h-10 w-10 text-gray-300" key={index} />;
    }
  };

  return (
    <div className={`flex ${type === "select" ? "cursor-pointer" : ""} gap-4`}>
      {Array.from({ length: 5 }, (_, index) => {
        const halfValue = index * 2 + 1;
        const fullValue = (index + 1) * 2;

        return (
          <span key={index} className="relative inline-block h-10 w-10">
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

            {getStarIcon(index)}
          </span>
        );
      })}
    </div>
  );
}
