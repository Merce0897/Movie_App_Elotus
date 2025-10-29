import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "./useTranslation";

interface MovieListResponse {
  page: number;
  results: MovieCardProps[];
  total_pages: number;
  total_results: number;
}

interface UseMovieListProps {
  enabled?: boolean;
}

// Hook for trending movies
export function useTrendingMovies({ enabled = true }: UseMovieListProps = {}) {
  const { language } = useTranslation();

  return useQuery<MovieListResponse>({
    queryKey: ["trending-movies", language],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/trending/movie/day?language=${language}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch trending movies: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for popular movies
export function usePopularMovies({ enabled = true }: UseMovieListProps = {}) {
  const { language } = useTranslation();

  return useQuery<MovieListResponse>({
    queryKey: ["popular-movies", language],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/movie/popular?language=${language}&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch popular movies: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for upcoming movies
export function useUpcomingMovies({ enabled = true }: UseMovieListProps = {}) {
  const { language } = useTranslation();

  return useQuery<MovieListResponse>({
    queryKey: ["upcoming-movies", language],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/movie/upcoming?language=${language}&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch upcoming movies: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for now playing movies (for homepage carousel)
export function useNowPlayingMovies({
  enabled = true,
}: UseMovieListProps = {}) {
  const { language } = useTranslation();

  return useQuery<MovieListResponse>({
    queryKey: ["now-playing-movies-homepage", language],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/movie/now_playing?language=${language}&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch now playing movies: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for top rated movies (for homepage carousel)
export function useTopRatedMovies({ enabled = true }: UseMovieListProps = {}) {
  const { language } = useTranslation();

  return useQuery<MovieListResponse>({
    queryKey: ["top-rated-movies-homepage", language],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/movie/top_rated?language=${language}&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch top rated movies: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
