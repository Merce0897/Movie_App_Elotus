import { createFileRoute } from "@tanstack/react-router";
import TopRated from "../pages/TopRated";

export const Route = createFileRoute("/top-rated")({
  component: TopRated,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page ?? 1),
    };
  },
});
