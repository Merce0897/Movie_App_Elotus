import { Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import "./CarouselMovieCard.scss";
import { useGenresStore } from "../../store/useGenresStore";
import { useTranslation } from "../../hooks/useTranslation";
import { LazyImage } from "../LazyImage";

export default function CarouselMovieCard({
  movie,
}: {
  movie: MovieCardProps;
}) {
  const { id, title, poster_path, release_date, genre_ids, vote_average } =
    movie;
  const { getGenreNameById } = useGenresStore();
  const { t, language } = useTranslation();

  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === "vi" ? "vi-VN" : "en-US";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <Link
      to="/movie/$movieId"
      params={{ movieId: id.toString() }}
      className="carousel-movie-card"
    >
      <div className="poster">
        <LazyImage
          src={`${import.meta.env.VITE_IMAGE_URL}/w500/${poster_path}`}
          alt={title}
          className="poster-image"
          threshold={0.1}
          rootMargin="50px"
        />

        <div className="rating">
          <Star className="icon" />
          <span>{vote_average.toFixed(1)}</span>
        </div>

        <div className="overlay">
          <div className="overlay-content">
            <h4 className="overlay-title">{title}</h4>
            <p className="overlay-date">{formatDate(release_date)}</p>
            <div className="overlay-genres">
              {genre_ids.slice(0, 2).map((genreId) => (
                <span key={genreId} className="overlay-genre">
                  {getGenreNameById(genreId, t("unknownGenre"))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="info">
        <h3 className="title">{title}</h3>
        <p className="release">{formatDate(release_date)}</p>
      </div>
    </Link>
  );
}
