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
    viewAll: "View All",
    backToHome: "Back to Home",
    movieNotFound: "Movie not found",
    unknownRuntime: "Unknown",
    votes: "votes",
    status: "Status",
    productionCompanies: "Production Companies",
    countries: "Countries",
    tryAgain: "Try Again",
    somethingWentWrong: "Something went wrong. Please try again.",
    // Home page
    discoverGreatMovies: "Discover Great Movies",
    exploreMovies: "Explore the latest, trending, and highest-rated movies",
    trending: "Trending Now",
    nowPlaying: "Now Playing",
    popular: "Popular",
    upcoming: "Upcoming",
    // Search page
    searchPrompt: "Search for your favorite movies",
    resultsFor: "Results for",
    foundResults: "Found",
    results: "results",
    noResultsText: "No results found for",
    tryDifferentKeywords: "Try searching with different keywords.",
    // Page titles
    upcomingMovies: "Upcoming Movies",
    discoverUpcoming: "Discover movies coming soon to theaters",
    popularMovies: "Popular Movies",
    discoverPopular: "Discover the most loved movies by audiences",
    topRatedMovies: "Top Rated Movies",
    discoverTopRated: "Discover the highest-rated movies of all time",
    nowPlayingMovies: "Now Playing Movies",
    discoverNowPlaying: "Discover the latest movies currently in theaters",
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
    viewAll: "Xem tất cả",
    backToHome: "Về trang chủ",
    movieNotFound: "Không tìm thấy phim",
    unknownRuntime: "Không rõ",
    votes: "bình chọn",
    status: "Trạng thái",
    productionCompanies: "Công ty sản xuất",
    countries: "Quốc gia",
    tryAgain: "Thử lại",
    somethingWentWrong: "Đã xảy ra lỗi. Vui lòng thử lại.",
    // Home page
    discoverGreatMovies: "Khám Phá Phim Hay",
    exploreMovies:
      "Tìm hiểu những bộ phim mới nhất, đang thịnh hành và được đánh giá cao",
    trending: "Đang Thịnh Hành",
    nowPlaying: "Đang Chiếu",
    popular: "Phổ Biến",
    upcoming: "Sắp Chiếu",
    // Search page
    searchPrompt: "Tìm kiếm bộ phim yêu thích của bạn",
    resultsFor: "Kết quả cho",
    foundResults: "Tìm thấy",
    results: "kết quả",
    noResultsText: "Không tìm thấy kết quả nào cho",
    tryDifferentKeywords: "Hãy thử với từ khóa khác.",
    // Page titles
    upcomingMovies: "Phim Sắp Chiếu",
    discoverUpcoming: "Khám phá những bộ phim sắp được ra mắt",
    popularMovies: "Phim Phổ Biến",
    discoverPopular: "Khám phá những bộ phim đang được yêu thích nhất",
    topRatedMovies: "Phim Được Đánh Giá Cao",
    discoverTopRated:
      "Khám phá những bộ phim được đánh giá cao nhất mọi thời đại",
    nowPlayingMovies: "Phim Đang Chiếu",
    discoverNowPlaying: "Khám phá những bộ phim mới nhất hiện đang chiếu rạp",
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
