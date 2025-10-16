import HomeClient from "@/app/(main)/home-client";

export const revalidate = 60;

const headers = {
  "Content-Type": "application/json",
  Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY ?? "",
};

async function genresData() {
  const r = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=ko", {
    headers,
    next: { revalidate: 3600, tags: ["tmdb:genres"] },
  });
  return r.json();
}

async function popularMoviesData() {
  const r = await fetch("https://api.themoviedb.org/3/movie/popular?language=ko", {
    headers,
    next: { revalidate: 300, tags: ["tmdb:popular"] },
  });
  return r.json();
}

async function nowPlayingMoviesData() {
  const r = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=ko&region=KR", {
    headers,
    next: { revalidate: 120, tags: ["tmdb:nowplaying"] },
  });
  return r.json();
}

async function newMoviesData(today: string) {
  const r = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=ko&sort_by=primary_release_date.desc&primary_release_date.lte=${today}&with_origin_country=KR`,
    { headers, next: { revalidate: 600, tags: ["tmdb:new"] } }
  );
  return r.json();
}

export default async function HomePage() {
  const today = new Date().toISOString().split("T")[0];
  const [genres, popular, nowPlaying, latest] = await Promise.all([
    genresData(),
    popularMoviesData(),
    nowPlayingMoviesData(),
    newMoviesData(today),
  ]);

  return (
    <HomeClient
      genres={genres}
      popularMoives={popular.results}
      nowPlayingMovies={nowPlaying.results}
      newMovies={latest.results}
    />
  );
}
