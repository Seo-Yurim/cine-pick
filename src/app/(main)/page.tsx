import HomeClient from "./home-client";

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

async function popularMoviesData() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
    },
  });

  return res.json();
}

async function nowPlayingMoviesData() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=ko&sort_by=vote_average.desc`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
      },
    },
  );

  return res.json();
}

async function newMoviesData(today: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=ko&sort_by=primary_release_date.desc&primary_release_date.lte=${today}&with_origin_country=KR`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
      },
    },
  );

  return res.json();
}

export default async function HomePage() {
  const today = new Date().toISOString().split("T")[0];

  const genres = await genresData();
  const popularMoives = await popularMoviesData();
  const nowPlayingMovies = await nowPlayingMoviesData();
  const newMovies = await newMoviesData(today);

  return (
    <HomeClient
      genres={genres}
      popularMoives={popularMoives.results}
      nowPlayingMovies={nowPlayingMovies.results}
      newMovies={newMovies.results}
    />
  );
}
