import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "App";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  return (
    <nav>
      <h1>Shao Blog</h1>
      <ul>
        <li>
          <input
            id="mode"
            type="checkbox"
            className="switch"
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <label htmlFor="mode">
            <i className={`far fa-${darkMode ? "sun" : "moon"}`}></i>
          </label>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">New Blog</Link>
        </li>
        <li>
          <Link to="/bookmark">Bookmarks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
