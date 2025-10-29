import { useParams } from "@tanstack/react-router";
import { useMovieDetails } from "../hooks/useMovieDetails";
import {
  MovieDetailsContent,
  MovieDetailsLoading,
  MovieDetailsError,
  MovieDetailContainer,
} from "../components/MovieDetails";

export default function MovieDetails() {
  const { movieId } = useParams({ from: "/movie/$movieId" });
  const { data: movie, isLoading, error } = useMovieDetails({ movieId });

  if (isLoading) {
    return (
      <>
        <MovieDetailsLoading />
      </>
    );
  }

  if (error || !movie) {
    return (
      <>
        <MovieDetailsError />
      </>
    );
  }

  return (
    <MovieDetailContainer>
      <MovieDetailsContent movie={movie} />
    </MovieDetailContainer>
  );
}
