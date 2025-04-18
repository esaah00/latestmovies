import { createContext, useState, useContext } from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => useContext(MovieContext);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const storedFavs = localStorage.getItem("favorites");
  const initialFavorites = storedFavs ? JSON.parse(storedFavs) : [];

  const [favorites, setFavorites] = useState<Movie[]>(initialFavorites);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((movie) => movie.id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}
