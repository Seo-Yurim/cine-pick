import { getSearchResult } from "@/services/search.service";
import { useQuery } from "@tanstack/react-query";

export function useSearchResult(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchResult(query),
    enabled: Boolean(query),
  });
}
