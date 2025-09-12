import React from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5;

  const generatePageNumbers = () => {
    const pages = [];
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    const start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, currentPage + half);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (start > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }
    if (end < totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="mt-6 flex items-center justify-center space-x-2">
      <button
        className={`${currentPage === 1 && "cursor-not-allowed text-gray-400"}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoMdArrowDropleftCircle className="h-10 w-10 text-foreground transition-colors duration-300 hover:text-point-color" />
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`h-14 w-14 rounded-full text-lg transition-colors duration-300 ${
              currentPage === page ? "bg-point-color" : "hover:bg-point-color"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="p-2 text-gray-500">
            {page}
          </span>
        ),
      )}

      <button
        className={` ${currentPage === totalPages && "cursor-not-allowed text-gray-400"}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoMdArrowDroprightCircle className="h-10 w-10 text-foreground transition-colors duration-300 hover:text-point-color" />
      </button>
    </div>
  );
};

export default Pagination;
