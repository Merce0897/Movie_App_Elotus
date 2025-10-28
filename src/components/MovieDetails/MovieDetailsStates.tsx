import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import "./MovieDetailsStates.scss";

export function MovieDetailsLoading() {
  const { t } = useTranslation();

  return (
    <div className="movie-details-states loading">
      <div className="loading-spinner"></div>
      <p>{t("loading")}</p>
    </div>
  );
}

export function MovieDetailsError() {
  const { t } = useTranslation();

  return (
    <div className="movie-details-states error">
      <h2>{t("error")}</h2>
      <p>{t("movieNotFound")}</p>
      <Link to="/" search={{ page: 1 }} className="back-link">
        <ArrowLeft className="icon" />
        {t("backToHome")}
      </Link>
    </div>
  );
}
