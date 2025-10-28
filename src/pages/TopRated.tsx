import { useQuery } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import MovieCard from "../components/MovieCard/MovieCard";
import Pagination from "../components/Pagination/Pagination";
import { useTranslation } from "../hooks/useTranslation";

export default function TopRated() {
  const { t, language } = useTranslation();
  const search = useSearch({ from: "/top-rated" });
  const navigate = useNavigate({ from: "/top-rated" });
  const currentPage = search.page || 1;

  // Fetch top rated movies
  const { isPending, error, data } = useQuery({
    queryKey: ["top-rated-movies", language, currentPage],
    queryFn: () =>
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }/movie/top_rated?language=${language}&page=${currentPage}`,
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
    return (
      <div className="container py-24">
        <div className="flex justify-center items-center">
          <div className="animate-pulse text-lg">{t("loading")}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-24">
        <div
          className="card p-16 mx-auto"
          style={{ maxWidth: "500px", textAlign: "center" }}
        >
          <h2 className="mb-8">{t("error")}</h2>
          <p>An error has occurred: {error.message}</p>
        </div>
      </div>
    );
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
          <h2 className="mb-8">{t("noResults")}</h2>
          <p>We couldn't find any movies to display at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-16" style={{ textAlign: "center" }}>
        <h1 className="mb-8">
          {language === "vi" ? "Phim Được Đánh Giá Cao" : "Top Rated Movies"}
        </h1>
        <p className="text-secondary mb-24">
          {language === "vi"
            ? "Khám phá những bộ phim được đánh giá cao nhất mọi thời đại"
            : "Discover the highest rated movies of all time"}
        </p>
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
