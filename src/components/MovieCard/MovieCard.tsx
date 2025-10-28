import { Star } from "lucide-react";
import "./MovieCard.scss";
import { useGenresStore } from "../../store/useGenresStore";
import { useTranslation } from "../../hooks/useTranslation";

export default function MovieCard({ movie }: { movie: MovieCardProps }) {
  const { title, poster_path, release_date, genre_ids, vote_average } = movie;
  const { getGenreNameById } = useGenresStore();
  const { t, language } = useTranslation();

  const onClick = () => {};

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
    <button onClick={onClick} className="movie-card">
      <div className="poster">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/${poster_path}`}
          alt={title}
          width={120}
          height={180}
          className="poster-image"
        />

        <div className="rating">
          <Star className="icon" />
          <span>{vote_average.toFixed(1)}</span>
        </div>
      </div>

      <div className="info">
        <h3 className="title">{title}</h3>
        <p className="release">{formatDate(release_date)}</p>
        <div className="genres">
          {genre_ids.slice(0, 2).map((genreId) => (
            <span key={genreId} className="genre">
              {getGenreNameById(genreId, t("unknownGenre"))}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
