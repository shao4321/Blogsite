import { CSSTransition } from "react-transition-group";
import NavContents from "./NavContents";

const HeaderNav = () => {
  return (
    <CSSTransition in={true} timeout={350} classNames="nav-bar" unmountOnExit>
      <NavContents />
    </CSSTransition>
  );
};

export default HeaderNav;
