import { createFileRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "../pages/Home";

const queryClient = new QueryClient();

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
