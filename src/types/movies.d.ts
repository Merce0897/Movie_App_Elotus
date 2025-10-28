interface Genre {
  id: number;
  name: string;
}

interface MovieCardProps {
  id: number | string;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
}
