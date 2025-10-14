"use client";

import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Loading() {
  const isFetching = useIsFetching();
  const isLoading = isFetching > 0;

  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setShow(true);
    } else {
      timeout = setTimeout(() => setShow(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div className="h-24 w-24 animate-spin rounded-full border-4 border-gray-200 border-t-rose-500"></div>
    </div>
  );
}
