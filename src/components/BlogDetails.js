import { useState } from "react";
import { useParams } from "react-router-dom";
import FormPage from "./FormPage";

const BlogDetails = ({ blogs, setBlogs }) => {
  const { id } = useParams();
  const storedBlogs = JSON.parse(localStorage.getItem("blogs"));
  const [blog, setBlog] = useState(
    storedBlogs.filter((blog) => blog.id === Number(id))[0]
  );
  const props = { storedBlogs, blog, setBlog, id: Number(id), blogs, setBlogs };

  return (
    <>
      {blog ? (
        <FormPage props={props} />
      ) : (
        <div className="error">404 not found</div>
      )}
    </>
  );
};

export default BlogDetails;
