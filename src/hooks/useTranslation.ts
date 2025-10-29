import { useLanguageStore } from "../store/useLanguageStore";

// Simple translation dictionary
const translations = {
  "en-US": {
    home: "Home",
    topRated: "Top Rated",
    about: "About",
    movieApp: "MovieApp",
    unknownGenre: "Unknown Genre",
    loading: "Loading ...",
    error: "Error",
    noResults: "No results found",
    search: "Search",
    searchMovies: "Search movies...",
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
    back: "Back",
    backToHome: "Back to Home",
    movieNotFound: "Movie not found",
    unknownRuntime: "Unknown",
    votes: "votes",
    status: "Status",
    productionCompanies: "Production Companies",
    countries: "Countries",
    tryAgain: "Try Again",
    somethingWentWrong: "Something went wrong. Please try again.",
  },
  vi: {
    home: "Trang chủ",
    topRated: "Đánh giá cao",
    about: "Giới thiệu",
    movieApp: "Ứng dụng Phim",
    unknownGenre: "Thể loại không xác định",
    loading: "Đang tải ...",
    error: "Lỗi",
    noResults: "Không tìm thấy kết quả",
    search: "Tìm kiếm",
    searchMovies: "Tìm kiếm phim...",
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
    back: "Quay lại",
    backToHome: "Về trang chủ",
    movieNotFound: "Không tìm thấy phim",
    unknownRuntime: "Không rõ",
    votes: "bình chọn",
    status: "Trạng thái",
    productionCompanies: "Công ty sản xuất",
    countries: "Quốc gia",
    tryAgain: "Thử lại",
    somethingWentWrong: "Đã xảy ra lỗi. Vui lòng thử lại.",
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
