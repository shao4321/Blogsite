import Home from "./Home";

const Main = ({ blogs, setBlogs, homePage }) => {
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
