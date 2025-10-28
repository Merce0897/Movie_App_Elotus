import { useLanguageStore } from "../store/useLanguageStore";

// Simple translation dictionary
const translations = {
  "en-US": {
    home: "Home",
    topRated: "Top Rated",
    about: "About",
    movieApp: "MovieApp",
    unknownGenre: "Unknown Genre",
    loading: "Loading...",
    error: "Error",
    noResults: "No results found",
    search: "Search",
    language: "Language",
    theme: "Theme",
    rating: "Rating",
    releaseDate: "Release Date",
    genres: "Genres",
    overview: "Overview",
    cast: "Cast",
    crew: "Crew",
    similar: "Similar Movies",
    recommended: "Recommended",
    year: "Year",
    duration: "Duration",
    budget: "Budget",
    revenue: "Revenue",
  },
  vi: {
    home: "Trang chủ",
    topRated: "Đánh giá cao",
    about: "Giới thiệu",
    movieApp: "Ứng dụng Phim",
    unknownGenre: "Thể loại không xác định",
    loading: "Đang tải...",
    error: "Lỗi",
    noResults: "Không tìm thấy kết quả",
    search: "Tìm kiếm",
    language: "Ngôn ngữ",
    theme: "Giao diện",
    rating: "Đánh giá",
    releaseDate: "Ngày phát hành",
    genres: "Thể loại",
    overview: "Tổng quan",
    cast: "Diễn viên",
    crew: "Ekip",
    similar: "Phim tương tự",
    recommended: "Gợi ý",
    year: "Năm",
    duration: "Thời lượng",
    budget: "Ngân sách",
    revenue: "Doanh thu",
  },
} as const;

type TranslationKey = keyof (typeof translations)["en-US"];

export function useTranslation() {
  const { language } = useLanguageStore();

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations["en-US"][key] || key;
  };

  return { t, language };
}
