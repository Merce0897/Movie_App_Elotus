import { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "../../hooks/useTranslation";
import "./Search.scss";

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  initialValue?: string;
}

export default function Search({
  placeholder,
  onSearch,
  className = "",
  initialValue = "",
}: SearchProps) {
  const [query, setQuery] = useState(initialValue);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const defaultPlaceholder = placeholder || t("searchMovies");

  // Update query when initialValue changes
  useEffect(() => {
    setQuery(initialValue);
    if (initialValue) {
      setIsExpanded(true);
    }
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        // Navigate to search results page
        navigate({
          to: "/search",
          search: { query: query.trim(), page: 1 },
        });
        setQuery("");
      }
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsExpanded(false);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!query) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClear();
      }
    };

    if (isExpanded) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  return (
    <div className={`search-container ${className}`}>
      <form
        onSubmit={handleSubmit}
        className={`search-form ${isExpanded ? "expanded" : ""}`}
      >
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={defaultPlaceholder}
            className="search-input"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear search"
            >
              <X className="clear-icon" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
