import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar" style={{}}>
      <div className="navbar-brand">
        <Link to="/latestmovies">Movies</Link>
      </div>
      <div className="navbar-links">
        <Link to="/latestmovies" className="nav-link">
          Home
        </Link>
        <Link to="/latestmovies/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
