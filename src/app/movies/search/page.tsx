import SearchResultClient from "./search-result.component";

async function genresData() {
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=ko`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
    },
  });

  return res.json();
}

async function searchResultData(query: string) {
  const res = await fetch(`https://api.themoviedb.org/3/search/multi?language=ko&query=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
    },
  });

  return res.json();
}

export default async function SearchPage({ searchParams}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query = "" } = await searchParams;

  const genres = await genresData();
  const searchResults = await searchResultData(query);

  return <SearchResultClient query={query} genres={genres} searchResults={searchResults.results} />;
}
