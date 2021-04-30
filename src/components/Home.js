import React, { useState } from "react";
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

export const AllContext = React.createContext();

const Home = ({ blogs, setBlogs, fetchProps, head }) => {
  const baseURL = "http://localhost:5000/blogs";
  const { isPending, hasError, errorMessage } = fetchProps;
  const [searchInput, setSearchInput] = useState("");
  const [selectedBlogs, setSelectedBlogs] = useState(new Set());
  const [prevSelectedId, setPrevSelectedId] = useState(null);
  const [availableIds, setAvailableIds] = useState([]);
  const [order, setOrder] = useState("");

  const handleDelete = (index) => {
    fetch(baseURL + "/" + index, {
      method: "DELETE",
    }).then(() => {
      setBlogs((currBlogs) => currBlogs.filter(({ id }) => id !== index));
      setSelectedBlogs((currSet) => {
        currSet.delete(index);
        return currSet;
      });
    });
  };

  const handleDeleteBlogs = () => {
    selectedBlogs.forEach((index) => {
      fetch(baseURL + "/" + index, {
        method: "DELETE",
      });
    });
    setBlogs((currBlogs) =>
      currBlogs.filter(({ id }) => !selectedBlogs.has(id))
    );
    setSelectedBlogs(new Set());
  };

  const toggleBookmark = (id, bookmark) => {
    const bookmarked = !bookmark;
    fetch(baseURL + "/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookmarked }),
    }).then(() => {
      fetch(baseURL)
        .then((res) => res.json())
        .then((data) => {
          setSelectedBlogs((currSet) => {
            currSet.delete(id);
            return currSet;
          });
          switch (order) {
            case "AZ":
              sortAZ(data, setBlogs);
              break;
            case "ZA":
              sortZA(data, setBlogs);
              break;
            case "wDateON":
              sortWrittenDateON(data, setBlogs);
              break;
            case "wDateNO":
              sortWrittenDateNO(data, setBlogs);
              break;
            case "eDateON":
              sortEditedDateON(data, setBlogs);
              break;
            case "eDateNO":
              sortEditedDateNO(data, setBlogs);
              break;
            default:
              setBlogs(data);
          }
        });
    });
  };

  const handleSelectedBlog = (e, id) => {
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

  return (
    <>
      {hasError && <h1 className="error">{errorMessage}</h1>}
      {!hasError && isPending && <h1 className="load">Loading...</h1>}
      {!hasError && !isPending && (
        <AllContext.Provider value={{ setOrder, setSelectedBlogs, blogs }}>
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
                blogs={blogs}
                setBlogs={setBlogs}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleDeleteBlogs={handleDeleteBlogs}
                selectedBlogs={selectedBlogs}
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
                blogDelete={handleDelete}
                toggleBookmark={toggleBookmark}
                searchInput={searchInput}
                selectedBlogs={selectedBlogs}
                handleSelectedBlog={handleSelectedBlog}
                setAvailableIds={setAvailableIds}
              />
            </CSSTransition>
          </main>
        </AllContext.Provider>
      )}
    </>
  );
};

export default Home;
