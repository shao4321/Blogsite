import DeleteBlogs from "./DeleteBlogs";
import Searchbar from "./Searchbar";
import SortButton from "./SortButton";
import { CSSTransition } from "react-transition-group";
import SelectAll from "./SelectAll";
import UnselectAll from "./UnselectAll";

const Header = ({
  head,
  blogs,
  setBlogs,
  searchInput,
  setSearchInput,
  handleDeleteBlogs,
  selectedBlogs,
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
          in={selectedBlogs.size > 0}
          timeout={350}
          classNames="btn-delete"
          unmountOnExit
          appear
        >
          <DeleteBlogs handleDelete={handleDeleteBlogs} />
        </CSSTransition>
        <SortButton blogs={blogs} setBlogs={setBlogs} />
      </div>
    </header>
  );
};

export default Header;
