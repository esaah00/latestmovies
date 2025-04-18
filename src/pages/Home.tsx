import MovieCard from "../components/MovieCard";
import { useCallback, useState } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { AiOutlineSend } from "react-icons/ai";
import "../css/Home.css";
import { useQuery } from "@tanstack/react-query";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const fetchPopular = async (): Promise<Movie[]> => {
  return await getPopularMovies();
};

const fetchSearched = async (query: string): Promise<Movie[]> => {
  return await searchMovies(query);
};

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: popularMovies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopular,
    staleTime: 3000,
  });

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      setIsSearchLoading(true);
      setSearchError(null);

      try {
        const results = await fetchSearched(searchQuery);
        setSearchResults(results);
      } catch (error) {
        setSearchError("Failed to fetch search results");
      } finally {
        setIsSearchLoading(false);
      }
    },
    [searchQuery]
  );

  if (error || searchError) {
    return <div className="error-message">{searchError}</div>;
  }

  if (isLoading || isSearchLoading) {
    return <div className="loading">Loading...</div>;
  }

  const movies = searchQuery.trim() ? searchResults : popularMovies;

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          id="search_movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          <AiOutlineSend />
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="movies-grid">
        {movies?.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
}

export default Home;
