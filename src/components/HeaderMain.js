import Searchbar from "./Searchbar";
import SortButton from "./SortButton";
import { CSSTransition } from "react-transition-group";
import SelectAll from "./SelectAll";
import UnselectAll from "./UnselectAll";

const HeaderMain = ({
  head,
  handleDeleteBlogs,
  selectedBlogs,
  iconToggled,
}) => {
  return (
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
          <button className="btn-delete" onClick={handleDeleteBlogs}>
            Delete Selected Blogs
          </button>
        </CSSTransition>
        <SortButton />
      </div>
    </header>
  );
};

export default HeaderMain;
