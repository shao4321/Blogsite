import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import FormCreate from "./FormCreate";

const Create = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [added, setAdded] = useState(0);

  const keyPressEvent = (e) => {
    // Submit the form when ctrl-enter key is pressed
    if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
      addCreateBlog(e);
    }
  };

  const addCreateBlog = (e) => {
    e.preventDefault();
    const datetime = new Date();
    const dateWritten = `${datetime.getDate()}/${
      datetime.getMonth() + 1
    }/${datetime.getFullYear()}, ${datetime.toLocaleTimeString()} `;
    const dateEdited = dateWritten;
    const blog = {
      title,
      content,
      dateWritten,
      dateEdited,
      bookmarked: false,
      id: blogs.length + 2,
    };
    const updatedBlogs = [...blogs, blog];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setAdded(1);
  };

  return (
    <CSSTransition
      in={true}
      timeout={350}
      classNames="blog-create"
      unmountOnExit
      appear
    >
      <FormCreate
        props={{
          addCreateBlog,
          title,
          setTitle,
          content,
          setContent,
          keyPressEvent,
          added,
          setAdded,
        }}
      />
    </CSSTransition>
  );
};

export default Create;
