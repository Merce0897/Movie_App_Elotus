import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguageStore } from "../../store/useLanguageStore";
import "./LanguageSelector.scss";

const languages = {
  "en-US": { flag: "/flag/en-flag.svg", label: "EN", fullName: "English" },
  vi: { flag: "/flag/vi-flag.jpg", label: "VI", fullName: "Tiếng Việt" },
} as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLanguage: "en-US" | "vi") => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage = languages[language];

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-trigger"
        onClick={toggleDropdown}
        title={currentLanguage.fullName}
      >
        <span className="language-display">
          <img
            className="flag"
            src={currentLanguage.flag}
            alt="Current language flag"
          />
          <span className="label">{currentLanguage.label}</span>
        </span>
        <div>
          <ChevronDown
            className={`chevron ${isOpen ? "open" : ""}`}
            size={16}
          />
        </div>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              className={`language-option ${language === code ? "active" : ""}`}
              onClick={() => handleLanguageChange(code as "en-US" | "vi")}
              title={lang.fullName}
            >
              <img
                className="flag"
                src={lang.flag}
                alt={`Flag of ${lang.fullName}`}
              />
              <span className="full-name">{lang.fullName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
