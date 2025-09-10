"use client";

import { Checkbox, CheckboxGroup } from "react-aria-components";
import { MovieGenres } from "@/types/movie.type";
import "./checkbox.component.scss";

interface CheckboxProps {
  list: MovieGenres;
  selected: string[];
  onSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export function CheckboxComponent({ list, selected, onSelected, ...props }: CheckboxProps) {
  return (
    <CheckboxGroup aria-label="장르 선택" value={selected} onChange={onSelected} {...props}>
      {list.genres.map((item) => (
        <Checkbox key={item.id} value={item.id}>
          <div
            className="mr-2 flex h-4 w-4 items-center justify-center rounded-md border"
            aria-hidden="true"
          >
            {selected.includes(item.id) && (
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
