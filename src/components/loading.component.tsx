"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Label, ProgressBar, ProgressBarProps } from "react-aria-components";

interface MyProgressBarProps extends ProgressBarProps {
  label?: string;
}

export function LoadingComponent({ label, ...props }: MyProgressBarProps) {
  const isFetching = useIsFetching(); // 쿼리(fetch) 진행 중인 개수
  const isMutating = useIsMutating(); // mutation 진행 중인 개수

  const isLoading = isFetching > 0 || isMutating > 0;

  if (!isLoading) return null;

  return (
    <ProgressBar
      className="mx-auto flex h-screen w-full max-w-96 flex-col items-center gap-8 py-96"
      {...props}
    >
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-foreground">
        <div className="absolute h-full w-1/3 animate-slide rounded-full bg-point-color" />
      </div>
      <Label className="text-xl font-semibold">{label}</Label>
    </ProgressBar>
  );
}
