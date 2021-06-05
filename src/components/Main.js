import { useState } from "react";
import { allBlogs } from "data/db.json";
import Home from "./Home";

const Main = ({ homePage }) => {
  const [blogs, setBlogs] = useState(allBlogs);

  return (
    <>
      {homePage ? (
        <Home blogs={blogs} setBlogs={setBlogs} head="All Blogs" />
      ) : (
        <Home
          blogs={blogs.filter(({ bookmarked }) => bookmarked)}
          setBlogs={setBlogs}
          head="Bookmarked Blogs"
        />
      )}
    </>
  );
};

export default Main;
