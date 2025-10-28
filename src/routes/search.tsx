import { createFileRoute } from "@tanstack/react-router";
import SearchResults from "../pages/SearchResults";

export const Route = createFileRoute("/search")({
  component: SearchResults,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      query: (search?.query as string) || "",
      page: Number(search?.page ?? 1),
    };
  },
});
