import { useState } from "react";
import Form from "./Form";
import useFetch from "./functions_hooks/useFetch";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const loadingMsg = "Loading...";
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const url = `http://localhost:5000/blogs/${id}`;
  const { isPending, errorMessage } = useFetch(url, setBlog);

  return (
    <>
      {isPending && !errorMessage && <h1 className="load">{loadingMsg}</h1>}
      {errorMessage ? (
        <h1 className="error">{errorMessage}</h1>
      ) : (
        !isPending && <Form blog={blog} updateBlog={setBlog} />
      )}
    </>
  );
};

export default BlogDetails;
