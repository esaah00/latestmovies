import "../css/Favorites.css";
import { useMovieContext } from "../context/Moviecontext";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Favorites() {
  const context = useMovieContext();

  if (!context) {
    return <div>Loading....</div>;
  }

  const { favorites } = context;

  if (favorites.length > 0) {
    return (
      <div>
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fav-empty">
      <h2>Favorite Movie is Empty</h2>
      <p>Add a Favorite Movie to See List of Favorites</p>
    </div>
  );
}

export default Favorites;
