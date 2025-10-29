import { useSearch, useNavigate } from "@tanstack/react-router";
import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";
import Search from "../components/Search/Search";
import { useTranslation } from "../hooks/useTranslation";
import { useSearchMovies } from "../hooks/useSearchMovies";
import Loader from "../components/Loader/Loader";
import { ErrorUI } from "../components/ErrorUI";

export default function SearchResults() {
  const { t, language } = useTranslation();
  const search = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const currentPage = search.page || 1;
  const query = search.query || "";

  // Fetch search results using custom hook
  const { isPending, error, data } = useSearchMovies({
    query,
    page: currentPage,
    enabled: !!query,
  });

  const handlePageChange = (page: number) => {
    navigate({
      search: { query, page },
    });
  };

  const handleNewSearch = (newQuery: string) => {
    navigate({
      search: { query: newQuery, page: 1 },
    });
  };

  // Show search form if no query
  if (!query) {
    return (
      <div className="container py-24">
        <div className="text-center mb-16">
          <h1 className="mb-8">{t("searchMovies")}</h1>
          <p className="text-secondary mb-24">
            {language === "vi"
              ? "Tìm kiếm bộ phim yêu thích của bạn"
              : "Search for your favorite movies"}
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <Search onSearch={handleNewSearch} initialValue={query} />
        </div>
      </div>
    );
  }

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <ErrorUI message={error.message} />;
  }

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const totalResults = data?.total_results || 0;

  return (
    <div className="container">
      <div className="py-16 text-center">
        <h1 className="mb-8">
          {language === "vi"
            ? `Kết quả cho "${query}"`
            : `Results for "${query}"`}
        </h1>
        <p className="text-secondary mb-16">
          {language === "vi"
            ? `Tìm thấy ${totalResults} kết quả`
            : `Found ${totalResults} results`}
        </p>
      </div>

      {movies.length === 0 ? (
        <div
          className="card p-16 mx-auto"
          style={{ maxWidth: "500px", textAlign: "center" }}
        >
          <h2 className="mb-8">{t("noResults")}</h2>
          <p>
            {language === "vi"
              ? `Không tìm thấy kết quả nào cho "${query}". Hãy thử với từ khóa khác.`
              : `No results found for "${query}". Try searching with different keywords.`}
          </p>
        </div>
      ) : (
        <>
          <div className="grid-layout pb-24">
            {movies.map((movie: MovieCardProps) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showFirstLast={true}
              maxVisiblePages={5}
              className={isPending ? "loading" : ""}
            />
          )}
        </>
      )}
    </div>
  );
}
