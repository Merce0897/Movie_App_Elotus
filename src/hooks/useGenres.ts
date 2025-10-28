import { useQuery } from "@tanstack/react-query";
import { useGenresStore } from "../store/useGenresStore";
import { useLanguageStore } from "../store/useLanguageStore";
import { useEffect } from "react";

interface GenresResponse {
  genres: Genre[];
}

export function useGenres() {
  const { setGenres } = useGenresStore();
  const { language } = useLanguageStore();

  const {
    data: genresData,
    isLoading,
    error,
  } = useQuery<GenresResponse>({
    queryKey: ["movie-genres", language],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_API_URL}/genre/movie/list?language=${
          language === "vi" ? "vi" : "en"
        }`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      ).then((res) => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes - genres don't change often but we need to refetch for language changes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });

  // Update genres store when data is fetched
  useEffect(() => {
    if (genresData?.genres) {
      setGenres(genresData.genres);
    }
  }, [genresData, setGenres]);

  return { genresData, isLoading, error };
}
