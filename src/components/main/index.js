import Home from "./Home";

const Main = ({ blogs, setBlogs, homePage }) => {
  return (
    <>
      {homePage ? (
        <Home
          originalBlogs={blogs}
          blogs={blogs}
          setBlogs={setBlogs}
          head="All Blogs"
        />
      ) : (
        <Home
          originalBlogs={blogs}
          blogs={blogs.filter(({ bookmarked }) => bookmarked)}
          setBlogs={setBlogs}
          head="Bookmarked Blogs"
        />
      )}
    </>
  );
};

export default Main;
