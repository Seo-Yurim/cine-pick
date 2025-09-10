"use client";

import { useState } from "react";
import { Button, Input, Tag, TagGroup, TagList } from "react-aria-components";
import { MdCancel } from "react-icons/md";

export function TagComponent({
  tagList,
  setTagList,
  ...props
}: {
  tagList: string[];
  setTagList: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [inputValue, setInputValue] = useState<string>("");

  const addTag = (tag: string) => {
    if (tag.trim() && !tagList.includes(tag)) setTagList([...tagList, tag.trim()]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
      setInputValue("");
    }
  };

  const handleRemove = (tagToRemove: string) => {
    setTagList(tagList.filter((tag) => tag !== tagToRemove));
  };

  return (
    <TagGroup aria-label="태그 추가" {...props} className="flex flex-col gap-4">
      <Input
        type="text"
        className="w-full rounded border px-3 py-1 font-semibold text-background"
        placeholder="인물을 입력해주세요."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <TagList className="flex flex-wrap items-center gap-2">
        {tagList.map((tag, idx) => (
          <Tag
            key={idx}
            textValue={tag}
            className="flex items-center gap-2 text-nowrap rounded-full border bg-foreground px-4 py-1 text-lg font-semibold leading-tight text-background"
          >
            {tag}
            <Button
              className="p-0 text-background"
              slot="remove"
              aria-label={`${tag} 태그 삭제`}
              onPress={() => handleRemove(tag)}
            >
              <MdCancel className="h-5 w-5" />
            </Button>
          </Tag>
        ))}
      </TagList>
    </TagGroup>
  );
}
