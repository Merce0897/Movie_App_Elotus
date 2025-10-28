import MovieBackdrop from "./MovieBackdrop";
import MoviePoster from "./MoviePoster";
import MovieInfo from "./MovieInfo";
import MovieAdditionalInfo from "./MovieAdditionalInfo";
import "./MovieDetailsContent.scss";
import MovieHeader from "./MovieHeader";

interface MovieDetailsContentProps {
  movie: MovieDetails;
}

export default function MovieDetailsContent({
  movie,
}: MovieDetailsContentProps) {
  return (
    <div className="movie-details-content" style={{ color: "white" }}>
      <MovieBackdrop backdropPath={movie.backdrop_path} title={movie.title} />

      <div className="content-wrapper">
        <MovieHeader />
        <div className="main-content">
          <div className="poster-container">
            <MoviePoster posterPath={movie.poster_path} title={movie.title} />
          </div>

          <div className="info-container">
            <MovieInfo
              title={movie.title}
              tagline={movie.tagline}
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
              releaseDate={movie.release_date}
              runtime={movie.runtime}
              originalLanguage={movie.original_language}
              genres={movie.genres}
              overview={movie.overview}
            />
          </div>
        </div>

        <MovieAdditionalInfo
          budget={movie.budget}
          revenue={movie.revenue}
          status={movie.status}
          productionCompanies={movie.production_companies}
          productionCountries={movie.production_countries}
        />
      </div>
    </div>
  );
}
