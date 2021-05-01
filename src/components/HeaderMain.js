import Searchbar from "./Searchbar";
import SortButton from "./SortButton";
import { CSSTransition } from "react-transition-group";
import SelectAll from "./SelectAll";
import UnselectAll from "./UnselectAll";

const HeaderMain = ({
  head,
  blogs,
  setBlogs,
  searchInput,
  setSearchInput,
  handleDeleteBlogs,
  selectedBlogs,
  bookmarkToggled,
}) => {
  return (
    <header>
      <h1 className="blog-head">{head}</h1>
      <div className="btn-container selectall">
        <Searchbar searchInput={searchInput} setSearchInput={setSearchInput} />
        <SelectAll />
        <UnselectAll />
      </div>
      <div className="btn-container">
        <CSSTransition
          in={!bookmarkToggled && selectedBlogs.size > 0}
          timeout={350}
          classNames="btn-delete"
          unmountOnExit
          appear
        >
          <button className="btn-delete" onClick={handleDeleteBlogs}>
            Delete Selected Blogs
          </button>
        </CSSTransition>
        <SortButton blogs={blogs} setBlogs={setBlogs} />
      </div>
    </header>
  );
};

export default HeaderMain;
