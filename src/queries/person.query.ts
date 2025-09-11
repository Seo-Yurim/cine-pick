import { getPersonInfo, getPersonMovies } from "@/services/person.service";
import { useQuery } from "@tanstack/react-query";

export function usePersonInfo(personId: string) {
  return useQuery({
    queryKey: ["person-detail", personId],
    queryFn: () => getPersonInfo(personId),
  });
}

export function usePersonMovies(personId: string) {
  return useQuery({
    queryKey: ["person-movies", personId],
    queryFn: () => getPersonMovies(personId),
  });
}
