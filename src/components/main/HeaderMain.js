import Searchbar from "../controls/Searchbar";
import SortButton from "../controls/SortButton";
import { CSSTransition } from "react-transition-group";
import SelectAll from "../controls/SelectAll";
import UnselectAll from "../controls/UnselectAll";
import DeleteButton from "components/controls/DeleteButton";

const HeaderMain = ({
  head,
  handleDeleteBlogs,
  selectedBlogs,
  iconToggled,
}) => {
  return (
    <CSSTransition
      in={true}
      timeout={350}
      classNames="main-bar"
      unmountOnExit
      appear
    >
      <header>
        <h1 className="blog-head">{head}</h1>
        <div className="btn-container selectall">
          <Searchbar />
          <SelectAll />
          <UnselectAll />
        </div>
        <div className="btn-container">
          <CSSTransition
            in={!iconToggled && selectedBlogs.size > 0}
            timeout={350}
            classNames="btn-delete"
            unmountOnExit
            appear
          >
            <DeleteButton handleDeleteBlogs={handleDeleteBlogs} />
          </CSSTransition>
          <SortButton />
        </div>
      </header>
    </CSSTransition>
  );
};

export default HeaderMain;
