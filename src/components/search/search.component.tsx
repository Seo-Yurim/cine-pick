"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, SearchField, Text } from "react-aria-components";
import { BsSearch } from "react-icons/bs";
import { PiArrowBendDownLeftFill } from "react-icons/pi";
import "./search.component.scss";

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
    <SearchField aria-label="검색어 입력" {...props}>
      <BsSearch className="h-6 w-6 text-background" />
      <Input
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <Text slot="description" />
      <Button onPress={handleSearch}>
        <PiArrowBendDownLeftFill className="h-6 w-6" />
      </Button>
    </SearchField>
  );
}
