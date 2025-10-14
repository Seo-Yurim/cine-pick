"use client";

import { useState } from "react";
import { Button, Input, Tag, TagGroup, TagList } from "react-aria-components";
import { MdCancel } from "react-icons/md";
import "./tag.component.scss";

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
    <TagGroup aria-label="태그 추가" {...props}>
      <Input
        type="text"
        placeholder="인물을 입력해주세요."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <TagList>
        {tagList.map((tag, idx) => (
          <Tag key={idx} textValue={tag}>
            {tag}
            <Button slot="remove" aria-label={`${tag} 태그 삭제`} onPress={() => handleRemove(tag)}>
              <MdCancel size={20} />
            </Button>
          </Tag>
        ))}
      </TagList>
    </TagGroup>
  );
}
