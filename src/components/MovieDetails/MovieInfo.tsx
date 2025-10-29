import { Calendar, Clock, Star } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import "./MovieInfo.scss";

interface Genre {
  id: number;
  name: string;
}

interface MovieInfoProps {
  title: string;
  tagline: string | null;
  voteAverage: number;
  voteCount: number;
  releaseDate: string;
  runtime: number | null;
  originalLanguage: string;
  genres: Genre[];
  overview: string;
}

export default function MovieInfo({
  title,
  tagline,
  voteAverage,
  voteCount,
  releaseDate,
  runtime,
  genres,
  overview,
}: MovieInfoProps) {
  const { t, language } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === "vi" ? "vi-VN" : "en-US";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (runtime: number | null) => {
    if (!runtime) return t("unknownRuntime");
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="movie-info">
      <div className="title-section">
        <h1 className="title">{title}</h1>
        {tagline && <p className="tagline">"{tagline}"</p>}
      </div>

      <div className="meta-info">
        <div className="rating">
          <Star className="icon" />
          <span className="score">{voteAverage.toFixed(1)}</span>
          <span className="votes">
            ({voteCount.toLocaleString()} {t("votes")})
          </span>
        </div>

        <div className="release-date">
          <Calendar className="icon" />
          <span>{formatDate(releaseDate)}</span>
        </div>

        {runtime && (
          <div className="runtime">
            <Clock className="icon" />
            <span>{formatRuntime(runtime)}</span>
          </div>
        )}
      </div>

      <div className="genres">
        {genres.map((genre) => (
          <span key={genre.id} className="genre">
            {genre.name}
          </span>
        ))}
      </div>

      {overview && (
        <div className="overview">
          <h3>{t("overview")}</h3>
          <p>{overview}</p>
        </div>
      )}
    </div>
  );
}
