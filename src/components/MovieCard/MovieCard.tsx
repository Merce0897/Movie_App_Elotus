import { Card, CardTitle, CardDescription } from "../ui/Card/Card";
import "./MovieCard.scss";

export default function MovieCard({ movie }: { movie: MovieCardProps }) {
  const { id, title, poster_path, overview, release_date, popularity } = movie;
  return (
    <Card className="movie-card">
      <div className="movie-card__content">
        {/* Poster Image */}
        <div className="movie-card__poster">
          {poster_path ? (
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/${poster_path}`}
              alt={title}
              width={120}
              height={180}
              className="poster-image"
            />
          ) : (
            <div className="poster-placeholder">
              <span>No Image</span>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="movie-card__info">
          <div className="movie-card__header">
            <CardTitle className="movie-card__title">{title}</CardTitle>
            <CardDescription className="movie-card__date">
              {release_date
                ? new Date(release_date).toLocaleDateString()
                : "Release date unknown"}
            </CardDescription>
          </div>

          {/* Overview */}
          <p className="movie-card__overview">
            {overview || "No overview available"}
          </p>

          {/* Popularity Badge */}
          <div className="movie-card__popularity">
            <span className="label">Popularity:</span>
            <div className="bar">
              <div
                className="fill"
                style={{ width: `${Math.min(popularity, 100)}%` }}
              />
            </div>
            <span className="value">{popularity.toFixed(1)}</span>
          </div>

          {/* Movie ID */}
          <p className="movie-card__id">ID: {id}</p>
        </div>
      </div>
    </Card>
  );
}
