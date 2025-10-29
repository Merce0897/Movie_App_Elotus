import React from "react";
import { Link } from "@tanstack/react-router";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import "./ErrorUI.scss";

interface ErrorUIProps {
  title?: string;
  message?: string;
  showRefresh?: boolean;
  onRefresh?: () => void;
  className?: string;
}

export const ErrorUI: React.FC<ErrorUIProps> = ({
  title,
  message,
  showRefresh = false,
  onRefresh,
  className = "",
}) => {
  const { t } = useTranslation();

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`error-ui ${className}`}>
      <div className="error-ui__container">
        <div className="error-ui__icon">
          <AlertTriangle size={64} />
        </div>

        <div className="error-ui__content">
          <h2 className="error-ui__title">{title || t("error")}</h2>

          <p className="error-ui__message">
            {message || t("somethingWentWrong")}
          </p>
        </div>

        <div className="error-ui__actions">
          <Link
            to="/"
            search={{ page: 1 }}
            className="error-ui__button error-ui__button--primary"
          >
            <Home size={18} />
            <span>{t("backToHome")}</span>
          </Link>

          {showRefresh && (
            <button
              onClick={handleRefresh}
              className="error-ui__button error-ui__button--secondary"
            >
              <RefreshCw size={18} />
              <span>{t("tryAgain")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
