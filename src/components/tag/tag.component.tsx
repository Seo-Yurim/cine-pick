"use client";

import { Button, Tag, TagGroup, TagList } from "react-aria-components";
import { MdCancel } from "react-icons/md";

export function TagComponent({ tags, ...props }: { tags: string[] }) {
  return (
    <TagGroup {...props}>
      <TagList className="flex items-center gap-2">
        {tags.map((tag, idx) => (
          <Tag
            key={idx}
            className="flex items-center gap-2 rounded-full border bg-foreground px-4 py-1 text-lg font-semibold leading-tight text-background"
          >
            {tag}
            <Button className="p-0 text-background" slot="remove" aria-label={`${tag} 태그 삭제`}>
              <MdCancel className="h-5 w-5" />
            </Button>
          </Tag>
        ))}
      </TagList>
    </TagGroup>
  );
}
