import { create } from "zustand";

type Language = "en-US" | "vi";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  initializeLanguage: () => void;
}

// Helper function to get initial language
const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en-US";

  // Check localStorage first
  const savedLanguage = localStorage.getItem("language") as Language;
  if (savedLanguage && (savedLanguage === "en-US" || savedLanguage === "vi")) {
    return savedLanguage;
  }

  // Check browser language
  const browserLanguage = navigator.language;
  if (browserLanguage.startsWith("vi")) {
    return "vi";
  }

  return "en-US";
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),

  initializeLanguage: () => {
    const language = getInitialLanguage();
    set({ language });
  },

  setLanguage: (language) => {
    localStorage.setItem("language", language);
    set({ language });
  },
}));
