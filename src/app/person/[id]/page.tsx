import PersonDetailClient from "./person-detail-client";

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

async function personDetailData(personId: string) {
  const res = await fetch(`https://api.themoviedb.org/3/person/${personId}?language=ko`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TMDB_API_KEY || "",
    },
  });

  return res.json();
}

async function personMoviesData(personId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${personId}/movie_credits?language=ko`,
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

export default async function PersonDetailPage({ params }: { params: { id: string } }) {
  const personId = params.id;

  const genres = await genresData();
  const personDetail = await personDetailData(personId);
  const personMovies = await personMoviesData(personId);

  return (
    <PersonDetailClient genres={genres} personDetail={personDetail} personMovies={personMovies} />
  );
}
