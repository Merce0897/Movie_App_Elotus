# Movie App Elotus 🎬

A modern, responsive movie discovery application built with React, TypeScript, and TanStack Router. Explore trending movies, search for your favorites, and discover new films with a beautiful and intuitive interface.

## ✨ Features

### 🎭 Movie Discovery

- **Trending Movies**: Discover the most popular movies trending right now
- **Now Playing**: See what's currently in theaters
- **Popular Movies**: Browse all-time popular films
- **Top Rated**: Explore critically acclaimed movies
- **Upcoming Releases**: Preview upcoming movie releases

### 🔍 Search & Navigation

- **Movie Search**: Search for movies by title with instant results
- **Advanced Filtering**: Filter movies by category and rating
- **Detailed Movie Information**: View comprehensive movie details including:
  - Plot summaries and descriptions
  - Cast and crew information
  - Release dates and ratings
  - High-quality poster and backdrop images
  - Additional movie metadata

### 🎨 User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Internationalization**: Multi-language support (English and Vietnamese)
- **Pagination**: Navigate through large movie collections with intuitive pagination controls
- **Smooth Animations**: CSS-based transitions and hover effects for enhanced user interaction
- **Lazy Loading**: Optimized image loading for better performance
- **Error Handling**: Graceful error states and loading indicators

### 🛠️ Technical Features

- **Modern React**: Built with React 19 and TypeScript
- **TanStack Router**: Type-safe routing with file-based routing system
- **TanStack Query**: Efficient data fetching and caching
- **State Management**: Zustand for lightweight global state
- **Styling**: SCSS for advanced styling capabilities
- **Performance Optimized**: Vite for fast development and optimized builds

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18 or higher) - [Download Node.js](https://nodejs.org/)
- **pnpm** (recommended) - [Install pnpm](https://pnpm.io/installation)
  ```bash
  npm install -g pnpm
  ```

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Merce0897/Movie_App_Elotus.git
   cd Movie_App_Elotus
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root directory
   - Add your TMDB API key (get one from [The Movie Database](https://www.themoviedb.org/settings/api)):

   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Generate route types** (Optional - for TypeScript route safety)
   ```bash
   pnpm generate:routes
   ```

### 🏃‍♂️ Running the Application

#### Development Mode

Start the development server with hot reload:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

#### Production Build

Build the application for production:

```bash
pnpm build
```

This will create optimized files in the `dist` directory.

#### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

#### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CarouselMovieCard/
│   ├── ErrorUI/
│   ├── LanguageSelector/
│   ├── LazyImage/
│   ├── Loader/
│   ├── MovieCard/
│   ├── MovieCarousel/
│   ├── MovieDetails/
│   ├── Navbar/
│   ├── Pagination/
│   ├── Search/
│   ├── ThemeSwitch/
│   └── ui/
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── routes/              # File-based routing
├── store/               # Zustand stores
├── styles/              # Global styles and themes
└── types/               # TypeScript type definitions
```

## 🛠️ Built With

### Core Technologies

- **[React 19](https://react.dev/)** - Frontend framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool and dev server

### Routing & Data

- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching

### Styling & UI

- **[SCSS](https://sass-lang.com/)** - Advanced CSS preprocessing
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Icon library

### State & Utils

- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[Date-fns](https://date-fns.org/)** - Date utilities

## 📱 Browser Support

This application supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Unsplash](https://unsplash.com/) for beautiful movie-related images
- The open-source community for the amazing tools and libraries

---

**Made with ❤️ by [Merce0897](https://github.com/Merce0897)**
