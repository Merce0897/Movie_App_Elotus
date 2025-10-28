import "./MovieDetailContainer.scss";

export default function MovieDetailContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="movie-detail-container">{children}</div>;
}
