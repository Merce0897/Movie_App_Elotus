import { Link } from "@tanstack/react-router";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import Search from "../Search/Search";
import { useTranslation } from "../../hooks/useTranslation";
import "./Navbar.scss";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            🎬 MovieApp
          </Link>
          <div className="navbar-search">
            <Search />
          </div>
        </div>

        <div className="navbar-content">
          <div className="navbar-links">
            <Link to="/" className="nav-link">
              {t("home")}
            </Link>
            <Link to="/now-playing" search={{ page: 1 }} className="nav-link">
              {t("nowPlaying")}
            </Link>
            <Link to="/top-rated" search={{ page: 1 }} className="nav-link">
              {t("topRated")}
            </Link>
          </div>

          <div className="navbar-actions">
            <LanguageSelector />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}
