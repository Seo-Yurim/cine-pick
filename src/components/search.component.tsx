"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, SearchField, Text } from "react-aria-components";
import { BsSearch } from "react-icons/bs";
import { PiArrowBendDownLeftFill } from "react-icons/pi";
import { ButtonComponent } from "./button/button.component";

interface SearchProps {
  defaultValue?: string;
  placeholder?: string;
}

export function SearchComponent({ defaultValue, placeholder, ...props }: SearchProps) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>(defaultValue || "");

  const handleSearch = () => {
    if (!searchKeyword.trim()) return;
    router.push(`/movies/search?query=${encodeURIComponent(searchKeyword.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <SearchField
      className="flex w-full items-center gap-4 rounded-xl bg-white py-1 pl-4 pr-2"
      aria-label="검색어 입력"
      {...props}
    >
      <BsSearch className="h-6 w-6 text-background" />
      <Input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-10 w-full text-background placeholder:font-semibold focus:outline-none"
      />
      <Text slot="description" />
      <ButtonComponent
        className="text-nowrap rounded-xl bg-point-color px-4 py-1 shadow-md hover:bg-point-color/70"
        onPress={handleSearch}
      >
        <PiArrowBendDownLeftFill className="h-6 w-6" />
      </ButtonComponent>
    </SearchField>
  );
}
