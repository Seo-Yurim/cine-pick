"use client";

import { Checkbox, CheckboxGroup } from "react-aria-components";
import { MovieGenres } from "@/types/movie.type";
import "./checkbox.component.scss";

export function CheckboxComponent({ list, ...props }: { list: MovieGenres }) {
  return (
    <CheckboxGroup {...props}>
      {list.genres.map((item) => (
        <Checkbox key={item.id} value={item.id}>
          <div className="h-4 w-4 rounded-md border" aria-hidden="true">
            <svg viewBox="0 0 18 18">
              <polyline points="1 9 7 14 15 4" />
            </svg>
          </div>
          {item.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
