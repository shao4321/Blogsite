import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Navbar = () => {
  return (
    <CSSTransition
      in={true}
      timeout={350}
      classNames="nav-bar"
      unmountOnExit
      appear
    >
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
    </CSSTransition>
  );
};

export default Navbar;
