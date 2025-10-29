import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "./useTranslation";

interface UseMovieDetailsProps {
  movieId: string | number;
  enabled?: boolean;
}

export function useMovieDetails({
  movieId,
  enabled = true,
}: UseMovieDetailsProps) {
  const { language } = useTranslation();

  return useQuery<MovieDetails>({
    queryKey: ["movie-details", movieId, language],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movie/${movieId}?language=${language}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch movie details: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled: enabled && !!movieId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}
