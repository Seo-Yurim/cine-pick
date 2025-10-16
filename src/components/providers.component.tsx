"use client";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ProvidersComponent({ children }: { children: React.ReactNode }) {

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </QueryClientProvider>
  );
}
