import "./MoviePoster.scss";

interface MoviePosterProps {
  posterPath: string | null;
  title: string;
}

export default function MoviePoster({ posterPath, title }: MoviePosterProps) {
  return (
    <div className="movie-poster">
      {posterPath ? (
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/w500/${posterPath}`}
          alt={title}
          className="poster-image"
        />
      ) : (
        <div className="poster-placeholder">
          <span>{title}</span>
        </div>
      )}
    </div>
  );
}
