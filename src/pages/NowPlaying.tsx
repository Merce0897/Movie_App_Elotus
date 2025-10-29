import { useQuery } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "../hooks/useTranslation";
import Loader from "../components/Loader/Loader";
import { ErrorUI } from "../components/ErrorUI";

export default function NowPlaying() {
  const { t, language } = useTranslation();
  const search = useSearch({ from: "/now-playing" });
  const navigate = useNavigate({ from: "/now-playing" });
  const currentPage = search.page || 1;

  // Fetch movies
  const { isPending, error, data } = useQuery({
    queryKey: ["now-playing-movies", language, currentPage],
    queryFn: () =>
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/movie/now_playing?language=${language}&page=${currentPage}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      ).then((res) => res.json()),
  });

  const handlePageChange = (page: number) => {
    navigate({
      search: { page },
    });
  };

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <ErrorUI />;
  }

  const movies = data?.results;
  const totalPages = data?.total_pages || 1;

  if (!movies || movies.length === 0) {
    return (
      <div className="container py-16 md:py-24">
        <div
          className="card p-8 md:p-16 mx-auto"
          style={{ maxWidth: "500px", textAlign: "center" }}
        >
          <h2 className="mb-6 md:mb-8">{t("noResults")}</h2>
          <p>We couldn't find any movies to display at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-12 md:py-16 text-center px-4">
        <h1 className="mb-6 md:mb-8">{t("nowPlayingMovies")}</h1>
        <p className="text-secondary max-w-2xl mx-auto leading-relaxed">
          {t("discoverNowPlaying")}
        </p>
      </div>

      <div className="grid-layout pb-16 md:pb-24">
        {movies.map((movie: MovieCardProps) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showFirstLast={true}
        maxVisiblePages={5}
        className={isPending ? "loading" : ""}
      />
    </div>
  );
}
