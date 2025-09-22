"use client";

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
  QueryClientProviderProps as TanstackQueryClientProviderProps,
} from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: true,
    },
  },
});

export type QueryClientProviderProps = Omit<TanstackQueryClientProviderProps, "client">;

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
};
