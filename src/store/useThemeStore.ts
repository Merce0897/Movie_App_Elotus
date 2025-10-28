import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

// Helper function to get initial theme
const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  // Check localStorage first
  const savedTheme = localStorage.getItem("theme") as Theme;
  if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
    return savedTheme;
  }

  // Check system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};

// Helper function to apply theme to DOM
const applyThemeToDOM = (theme: Theme) => {
  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),

  initializeTheme: () => {
    const theme = getInitialTheme();
    applyThemeToDOM(theme);
    set({ theme });

    // Listen for system theme changes
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        const savedTheme = localStorage.getItem("theme");
        if (!savedTheme) {
          const newTheme = e.matches ? "dark" : "light";
          applyThemeToDOM(newTheme);
          set({ theme: newTheme });
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  },

  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";

    localStorage.setItem("theme", newTheme);
    applyThemeToDOM(newTheme);
    set({ theme: newTheme });
  },

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    applyThemeToDOM(theme);
    set({ theme });
  },
}));
