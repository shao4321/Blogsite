import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Shao Blog</h1>
      <ul>
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
