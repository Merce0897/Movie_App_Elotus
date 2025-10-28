import { useTranslation } from "../../hooks/useTranslation";
import "./MovieAdditionalInfo.scss";

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
}

interface ProductionCountry {
  name: string;
}

interface MovieAdditionalInfoProps {
  budget: number;
  revenue: number;
  status: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
}

export default function MovieAdditionalInfo({
  budget,
  revenue,
  status,
  productionCompanies,
  productionCountries,
}: MovieAdditionalInfoProps) {
  const { t } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };

  return (
    <div className="movie-additional-info">
      <h3 className="section-title">Additional Details</h3>

      <div className="info-grid">
        {budget > 0 && (
          <div className="info-card">
            <div className="info-header">
              <strong>{t("budget")}</strong>
            </div>
            <div className="info-value">{formatCurrency(budget)}</div>
          </div>
        )}

        {revenue > 0 && (
          <div className="info-card">
            <div className="info-header">
              <strong>{t("revenue")}</strong>
            </div>
            <div className="info-value">{formatCurrency(revenue)}</div>
          </div>
        )}

        {status && (
          <div className="info-card">
            <div className="info-header">
              <strong>{t("status")}</strong>
            </div>
            <div className="info-value">{status}</div>
          </div>
        )}

        {productionCountries.length > 0 && (
          <div className="info-card full-width">
            <div className="info-header">
              <strong>{t("countries")}</strong>
            </div>
            <div className="info-value">
              {productionCountries.map((c) => c.name).join(", ")}
            </div>
          </div>
        )}

        {productionCompanies.length > 0 && (
          <div className="info-card full-width">
            <div className="info-header">
              <strong>{t("productionCompanies")}</strong>
            </div>
            <div className="companies">
              {productionCompanies.map((company) => (
                <div key={company.id} className="company">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                    alt={company.name}
                    className="company-logo"
                  />
                  <p>{company.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
