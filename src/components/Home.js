import { useState, createContext } from "react";
import Bloglist from "./Bloglist";
import { CSSTransition } from "react-transition-group";
import HeaderMain from "./HeaderMain";
import {
  sortAZ,
  sortZA,
  sortWrittenDateON,
  sortWrittenDateNO,
  sortEditedDateON,
  sortEditedDateNO,
} from "./functions_hooks/sort";

export const AllContext = createContext();

const Home = ({ blogs, setBlogs, head }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedBlogs, setSelectedBlogs] = useState(new Set());
  const [prevSelectedId, setPrevSelectedId] = useState(null);
  const [availableIds, setAvailableIds] = useState([]);
  const [order, setOrder] = useState("");
  let iconToggled = false;

  const handleDelete = (index) => {
    iconToggled = true;
    const updatedBlogs = blogs.filter(({ id }) => id !== index);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setSelectedBlogs((currSet) => {
      currSet.delete(index);
      return currSet;
    });
  };

  const handleDeleteSelectedBlogs = () => {
    const updatedBlogs = blogs.filter(({ id }) => !selectedBlogs.has(id));
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setSelectedBlogs(new Set());
  };

  const toggleBookmark = (id, bookmark) => {
    iconToggled = true;
    const updatedBlogs = blogs.map((blog) =>
      blog.id === id ? { ...blog, bookmarked: !bookmark } : blog
    );
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setSelectedBlogs((currSet) => {
      currSet.delete(id);
      return currSet;
    });
    switch (order) {
      case "AZ":
        sortAZ(updatedBlogs, setBlogs);
        break;
      case "ZA":
        sortZA(updatedBlogs, setBlogs);
        break;
      case "wDateON":
        sortWrittenDateON(updatedBlogs, setBlogs);
        break;
      case "wDateNO":
        sortWrittenDateNO(updatedBlogs, setBlogs);
        break;
      case "eDateON":
        sortEditedDateON(updatedBlogs, setBlogs);
        break;
      case "eDateNO":
        sortEditedDateNO(updatedBlogs, setBlogs);
        break;
      default:
        setBlogs(updatedBlogs);
    }
  };

  const handleSelectedBlog = (e, id) => {
    if (iconToggled) {
      iconToggled = false;
      return;
    }
    // Selecting multiple blogs
    if (e.shiftKey && prevSelectedId) {
      let inBetweenIds;
      if (id >= prevSelectedId) {
        inBetweenIds = availableIds.filter((i) => i < id && i > prevSelectedId);
      } else {
        inBetweenIds = availableIds.filter((i) => i > id && i < prevSelectedId);
      }
      // Update the in-between selected articles if shiftkey is pressed
      if (selectedBlogs.has(id)) {
        inBetweenIds.forEach((id) =>
          setSelectedBlogs((currSet) => {
            currSet.delete(id);
            return currSet;
          })
        );
      } else {
        inBetweenIds.forEach((id) => {
          setSelectedBlogs((currSet) => currSet.add(id));
        });
      }
    }
    // Select single blog
    if (selectedBlogs.has(id)) {
      if (selectedBlogs.size === 1) {
        setSelectedBlogs(new Set());
      } else {
        setSelectedBlogs((currSet) => {
          currSet.delete(id);
          return currSet;
        });
      }
      e.target.className = "article-container";
    } else {
      if (selectedBlogs.size === 0) {
        setSelectedBlogs(new Set([id]));
      } else {
        setSelectedBlogs((currSet) => currSet.add(id));
      }
      e.target.className += " selected";
    }
    setPrevSelectedId(id);
  };

  const contextProps = {
    setOrder,
    selectedBlogs,
    setSelectedBlogs,
    blogs,
    setBlogs,
    searchInput,
    setSearchInput,
    handleDelete,
    toggleBookmark,
    handleSelectedBlog,
  };

  return (
    <AllContext.Provider value={contextProps}>
      {blogs.length > 0 ? (
        <main>
          <CSSTransition
            in={true}
            timeout={350}
            classNames="main-bar"
            unmountOnExit
            appear
          >
            <HeaderMain
              head={head}
              handleDeleteBlogs={handleDeleteSelectedBlogs}
              selectedBlogs={selectedBlogs}
              iconToggled={iconToggled}
            />
          </CSSTransition>
          <hr />
          <CSSTransition
            in={true}
            timeout={350}
            classNames="section"
            unmountOnExit
            appear
          >
            <Bloglist
              blogs={blogs}
              searchInput={searchInput}
              setAvailableIds={setAvailableIds}
            />
          </CSSTransition>
        </main>
      ) : (
        <div className="load">No Blogs To Display</div>
      )}
    </AllContext.Provider>
  );
};

export default Home;
