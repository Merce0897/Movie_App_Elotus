import "./MovieBackdrop.scss";

interface MovieBackdropProps {
  backdropPath: string | null;
  title: string;
}

export default function MovieBackdrop({
  backdropPath,
  title,
}: MovieBackdropProps) {
  if (!backdropPath) return null;

  return (
    <div className="movie-backdrop">
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}/original/${backdropPath}`}
        alt={title}
        className="backdrop-image"
      />
      {/* <div className="backdrop-overlay"></div> */}
    </div>
  );
}
