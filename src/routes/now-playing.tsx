import { createFileRoute } from "@tanstack/react-router";
import NowPlaying from "../pages/NowPlaying";

export const Route = createFileRoute("/now-playing")({
  component: NowPlaying,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search?.page ?? 1),
    };
  },
});
