import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e, setData) => setData(e.target.value);

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
      <form className="blog-create" onSubmit={addCreateBlog}>
        <label>Blog Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleChange(e, setTitle)}
          autoFocus
        />
        <label>Blog Content</label>
        <textarea
          value={content}
          onChange={(e) => handleChange(e, setContent)}
          onKeyUp={keyPressEvent}
        ></textarea>
        {isPending ? (
          <input
            type="submit"
            className="btn-form"
            value="Adding Blog..."
            disabled
          />
        ) : (
          <input type="submit" className="btn-form" value="Add New Blog" />
        )}
      </form>
    </CSSTransition>
  );
};

export default Create;
