import { useState } from "react";
import FormPage from "./FormPage";
import useFetch from "./functions_hooks/useFetch";
import { useParams } from "react-router-dom";

const BlogDetails = ({ baseURL }) => {
  const loadingMsg = "Loading...";
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const url = baseURL + "/" + id;
  const { isPending, errorMessage } = useFetch(url, setBlog);

  return (
    <>
      {isPending && !errorMessage && <h1 className="load">{loadingMsg}</h1>}
      {errorMessage ? (
        <h1 className="error">{errorMessage}</h1>
      ) : (
        !isPending && (
          <FormPage blog={blog} updateBlog={setBlog} baseURL={baseURL} />
        )
      )}
    </>
  );
};

export default BlogDetails;
