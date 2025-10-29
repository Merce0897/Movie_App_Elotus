import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useGenres } from "../hooks/useGenres";
import { useThemeStore } from "../store/useThemeStore";
import { useLanguageStore } from "../store/useLanguageStore";

const queryClient = new QueryClient();

const AppContent = () => {
  const { initializeTheme } = useThemeStore();
  const { initializeLanguage } = useLanguageStore();

  useGenres();

  useEffect(() => {
    initializeTheme();
    initializeLanguage();
  }, [initializeTheme, initializeLanguage]);

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
    <TanStackRouterDevtools />
  </QueryClientProvider>
);

export const Route = createRootRoute({ component: RootLayout });
