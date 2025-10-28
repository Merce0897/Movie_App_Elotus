import { useRouter, useCanGoBack } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import "./MovieHeader.scss";

export default function MovieHeader() {
  const { t } = useTranslation();

  const router = useRouter();
  const canGoBack = useCanGoBack();

  const goBack = () => {
    router.history.back();
  };

  return (
    <div className="movie-header">
      <div className="container">
        {canGoBack && (
          <button className="back-link" onClick={goBack}>
            <ArrowLeft className="icon" />
            {t("back")}
          </button>
        )}
      </div>
    </div>
  );
}
