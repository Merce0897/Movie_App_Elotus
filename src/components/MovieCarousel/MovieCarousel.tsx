import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import CarouselMovieCard from "../CarouselMovieCard";
import "./MovieCarousel.scss";
import { useTranslation } from "../../hooks/useTranslation";

interface MovieCarouselProps {
  title: string;
  movies: MovieCardProps[];
  isLoading?: boolean;
  viewAllLink?: string;
  error?: string | null;
}

export default function MovieCarousel({
  title,
  movies,
  isLoading = false,
  viewAllLink,
  error,
}: MovieCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return (
      <section className="movie-carousel">
        <div className="carousel-header">
          <h2 className="carousel-title">{title}</h2>
        </div>
        <div className="carousel-error">
          <p>Failed to load movies. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-carousel">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} search={{ page: 1 }} className="view-all-link">
            <span>{t("viewAll")}</span>
          </Link>
        )}
      </div>

      <div className="carousel-container">
        {isLoading ? (
          <div className="carousel-loading">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <>
            <button
              className="carousel-btn carousel-btn-left"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="carousel-scroll" ref={scrollContainerRef}>
              {movies.map((movie) => (
                <div key={movie.id} className="carousel-item">
                  <CarouselMovieCard movie={movie} />
                </div>
              ))}
            </div>

            <button
              className="carousel-btn carousel-btn-right"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
