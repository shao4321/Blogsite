import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import FormCreate from "./FormCreate";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);

  const keyPressEvent = (e) => {
    // Submit the form when ctrl-enter key is pressed
    if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
      addCreateBlog(e);
    }
  };

  const addCreateBlog = (e) => {
    e.preventDefault();
    setIsPending(true);
    const datetime = new Date();
    const dateWritten = `${datetime.getDate()}/${
      datetime.getMonth() + 1
    }/${datetime.getFullYear()}, ${datetime.toLocaleTimeString()} `;
    const dateEdited = dateWritten;
    const blog = { title, content, dateWritten, dateEdited, bookmarked: false };
    const baseURL = "http://localhost:5000/blogs";

    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsPending(false);
    });
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
          isPending,
        }}
      />
    </CSSTransition>
  );
};

export default Create;
