"use client";

import { Checkbox, CheckboxGroup } from "react-aria-components";
import { GenresList } from "@/types/movie.type";

interface CheckboxProps {
  list: GenresList;
  selected: string[];
  onSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export function CheckboxComponent({ list, selected, onSelected, ...props }: CheckboxProps) {
  return (
    <CheckboxGroup
      className="flex flex-wrap items-center gap-4"
      aria-label="장르 선택"
      value={selected}
      onChange={onSelected}
      {...props}
    >
      {list.genres.map((item) => (
        <Checkbox
          className="flex items-center gap-2 text-nowrap text-lg"
          key={item.id}
          value={String(item.id)}
        >
          <div
            className="mr-2 flex h-4 w-4 items-center justify-center rounded-md border"
            aria-hidden="true"
          >
            {selected.includes(String(item.id)) && (
              <svg viewBox="0 0 18 18" className="h-3 w-3 stroke-white">
                <polyline
                  points="1 9 7 14 15 4"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span>{item.name}</span>
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
