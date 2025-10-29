import { create } from "zustand";

interface GenresState {
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
  getGenreById: (id: number) => Genre | undefined;
  getGenreNameById: (id: number, unknownText?: string) => string;
}

export const useGenresStore = create<GenresState>((set, get) => ({
  genres: [],

  setGenres: (genres) => {
    set({ genres });
  },

  getGenreById: (id) => {
    const { genres } = get();
    return genres.find((genre) => genre.id === id);
  },

  getGenreNameById: (id, unknownText = "Unknown Genre") => {
    const genre = get().getGenreById(id);
    return genre ? genre.name : unknownText;
  },
}));
