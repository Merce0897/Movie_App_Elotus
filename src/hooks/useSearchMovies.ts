import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "./useTranslation";

interface UseSearchMoviesProps {
  query: string;
  page?: number;
  enabled?: boolean;
}

interface SearchMoviesResponse {
  page: number;
  results: MovieCardProps[];
  total_pages: number;
  total_results: number;
}

export function useSearchMovies({
  query,
  page = 1,
  enabled = true,
}: UseSearchMoviesProps) {
  const { language } = useTranslation();

  return useQuery<SearchMoviesResponse>({
    queryKey: ["search-movies", language, query, page],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=${language}&page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Search failed: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled: enabled && !!query.trim(), // Only run query if search term exists and is enabled
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
