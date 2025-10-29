import { useEffect } from "react";
import { useThemeStore } from "../../store/useThemeStore";
import "./theme-switch.scss";

export const ThemeSwitch = () => {
  const { theme, toggleTheme, initializeTheme } = useThemeStore();

  // Initialize theme on mount (SSR-safe)
  useEffect(() => {
    const cleanup = initializeTheme();
    return cleanup;
  }, [initializeTheme]);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      />
      <span className="slider" />
    </label>
  );
};
