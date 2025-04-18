import "../css/MovieCard.css";
import { useMovieContext } from "../context/Moviecontext";
import { GiHearts } from "react-icons/gi";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

function MovieCard({ movie }: { movie: Movie }) {
  const context = useMovieContext();
  if (!context) {
    return <div>Loading....</div>;
  }

  const { isFavorite, addToFavorites, removeFromFavorites } = context;
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            type="button"
            className={`favorite-btn${favorite ? " active" : ""}`}
            onClick={onFavoriteClick}
          >
            <GiHearts />
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
