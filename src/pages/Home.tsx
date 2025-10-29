import MovieCarousel from "../components/MovieCarousel/MovieCarousel";
import { useTranslation } from "../hooks/useTranslation";
import {
  useTrendingMovies,
  useNowPlayingMovies,
  useTopRatedMovies,
  usePopularMovies,
  useUpcomingMovies,
} from "../hooks/useMovieLists";

export default function Home() {
  const { t } = useTranslation();

  // Fetch all movie lists
  const trendingMovies = useTrendingMovies();
  const nowPlayingMovies = useNowPlayingMovies();
  const topRatedMovies = useTopRatedMovies();
  const popularMovies = usePopularMovies();
  const upcomingMovies = useUpcomingMovies();

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-8 md:mb-12 px-4">
        <h1 className="mb-4">{t("discoverGreatMovies")}</h1>
        <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
          {t("exploreMovies")}
        </p>
      </div>

      <div className="movie-lists space-y-8 md:space-y-12">
        {/* Trending Movies */}
        <MovieCarousel
          title={t("trending")}
          movies={trendingMovies.data?.results?.slice(0, 12) || []}
          isLoading={trendingMovies.isPending}
          error={trendingMovies.error?.message}
        />

        {/* Now Playing Movies */}
        <MovieCarousel
          title={t("nowPlaying")}
          movies={nowPlayingMovies.data?.results?.slice(0, 12) || []}
          isLoading={nowPlayingMovies.isPending}
          error={nowPlayingMovies.error?.message}
          viewAllLink="/now-playing"
        />

        {/* Popular Movies */}
        <MovieCarousel
          title={t("popular")}
          movies={popularMovies.data?.results?.slice(0, 12) || []}
          isLoading={popularMovies.isPending}
          error={popularMovies.error?.message}
        />

        {/* Top Rated Movies */}
        <MovieCarousel
          title={t("topRated")}
          movies={topRatedMovies.data?.results?.slice(0, 12) || []}
          isLoading={topRatedMovies.isPending}
          error={topRatedMovies.error?.message}
          viewAllLink="/top-rated"
        />

        {/* Upcoming Movies */}
        <MovieCarousel
          title={t("upcoming")}
          movies={upcomingMovies.data?.results?.slice(0, 12) || []}
          isLoading={upcomingMovies.isPending}
          error={upcomingMovies.error?.message}
        />
      </div>
    </div>
  );
}
