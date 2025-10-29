import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "../hooks/useTranslation";
import Loader from "../components/Loader/Loader";
import { ErrorUI } from "../components/ErrorUI";

export const Route = createFileRoute("/popular")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page) || 1,
    };
  },
  component: Popular,
});

function Popular() {
  const { t, language } = useTranslation();
  const search = useSearch({ from: "/popular" });
  const navigate = useNavigate({ from: "/popular" });
  const currentPage = search.page || 1;

  // Fetch popular movies
  const { isPending, error, data } = useQuery({
    queryKey: ["popular-movies", language, currentPage],
    queryFn: () =>
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/movie/popular?language=${language}&page=${currentPage}`,
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
      <div className="container py-24">
        <div
          className="card p-16 mx-auto"
          style={{ maxWidth: "500px", textAlign: "center" }}
        >
          <h2 className="mb-8">No results found</h2>
          <p>We couldn't find any movies to display at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-16" style={{ textAlign: "center" }}>
        <h1 className="mb-8">{t("popularMovies")}</h1>
        <p className="text-secondary mb-24">{t("discoverPopular")}</p>
      </div>

      <div className="grid-layout pb-24">
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
