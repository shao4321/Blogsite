import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "App";

const NavLinks = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  return (
    <ul>
      <li>
        <input
          id="mode"
          type="checkbox"
          className="switch"
          onChange={(e) => {
            const isDarkMode =e.target.checked
            setDarkMode(isDarkMode)
            localStorage.setItem("isDarkMode", isDarkMode)
          }}
          checked={darkMode}
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
  );
};

export default NavLinks;
