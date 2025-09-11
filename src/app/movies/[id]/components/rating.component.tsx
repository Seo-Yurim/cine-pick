"use client";

import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export function RatingComponent() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
  };

  const handleClick = (value: number) => {
    setRating(value);
  };

  const getStarIcon = (index: number) => {
    const value = (index + 1) * 2;

    const currentRating = hoverRating || rating;

    if (currentRating >= value) {
      return <FaStar className="h-10 w-10 text-yellow-400" key={index} />;
    } else if (currentRating >= value - 1) {
      return <FaStarHalfAlt className="h-10 w-10 text-yellow-400" key={index} />;
    } else {
      return <FaRegStar className="h-10 w-10 text-gray-300" key={index} />;
    }
  };
  console.log(rating);

  return (
    <div className="flex cursor-pointer gap-4">
      {Array.from({ length: 5 }, (_, index) => {
        const halfValue = index * 2 + 1;
        const fullValue = (index + 1) * 2;

        return (
          <span key={index} className="relative inline-block h-10 w-10">
            {/* 왼쪽 절반 (0.5) */}
            <span
              className="absolute z-10 h-full w-1/2"
              onMouseEnter={() => handleMouseEnter(halfValue)}
              onClick={() => handleClick(halfValue)}
              onMouseLeave={() => setHoverRating(0)}
            />

            {/* 오른쪽 절반 (1.0) */}
            <span
              className="absolute right-0 z-10 h-full w-1/2"
              onMouseEnter={() => handleMouseEnter(fullValue)}
              onClick={() => handleClick(fullValue)}
              onMouseLeave={() => setHoverRating(0)}
            />

            {/* 아이콘 */}
            {getStarIcon(index)}
          </span>
        );
      })}
    </div>
  );
}
