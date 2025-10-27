import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard/MovieCard";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_API_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      ).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  const movies = data.results;

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div>
        {movies.map((movie: MovieCardProps) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
