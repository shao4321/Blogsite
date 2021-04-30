import { useState } from "react";
import useFetch from "./functions_hooks/useFetch";
import Home from "./Home";

const Main = ({ homePage }) => {
  const [blogs, setBlogs] = useState([]);
  const baseURL = "http://localhost:5000/blogs";
  const fetchProps = useFetch(baseURL, setBlogs);

  return (
    <>
      {homePage ? (
        <Home
          fetchProps={fetchProps}
          blogs={blogs}
          setBlogs={setBlogs}
          head="All Blogs"
        />
      ) : (
        <Home
          fetchProps={fetchProps}
          blogs={blogs.filter(({ bookmarked }) => bookmarked)}
          setBlogs={setBlogs}
          head="Bookmarked Blogs"
        />
      )}
    </>
  );
};

export default Main;
