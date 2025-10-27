import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/movieCard/MovieCard";

export default function Home() {
  const url = import.meta.env.VITE_API_SERVER;
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log("apiKey", apiKey);

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${url}/movie/popular?language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      }).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  const movies = data.results;
  console.log("movies", movies);

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        {movies.map((movie: MovieCardProps) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
