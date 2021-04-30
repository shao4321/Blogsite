import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Form = ({ blog }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [prevTitle, setPrevTitle] = useState(blog.title);
  const [prevContent, setPrevContent] = useState(blog.content);
  const [disabled, setDisabled] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const url = `http://localhost:5000/blogs/${id}`;

  const keyPressEvent = (e) => {
    // Submit the form when ctrl-enter key is pressed
    if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
      updateBlogDetails(e);
    }
  };

  // Prompt user if they want to save before cancelling
  const cancelEdit = () => {
    if (title !== blog.title || content !== blog.content) {
      const promptResponse = window.confirm(
        "Blog details had been edited. Do you want to save changes before cancel?"
      );
      if (promptResponse) {
        const datetime = new Date();
        const dateEdited = `${datetime.getDate()}/${
          datetime.getMonth() + 1
        }/${datetime.getFullYear()}, ${datetime.toLocaleTimeString()} `;
        const newBlog = { title, content, dateEdited };
        fetch(url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBlog),
        }).then(() => {
          setPrevTitle(title);
          setPrevContent(content);
        });
      } else {
        setTitle(prevTitle);
        setContent(prevContent);
      }
    }
    setDisabled(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "DELETE",
    }).then(() => history.push("/"));
  };

  const updateBlogDetails = (e) => {
    e.preventDefault();
    const datetime = new Date();
    const dateEdited = `${datetime.getDate()}/${
      datetime.getMonth() + 1
    }/${datetime.getFullYear()}, ${datetime.toLocaleTimeString()} `;
    const newBlog = { title, content, dateEdited };

    fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    }).then(() => history.push("/"));
  };

  return (
    <CSSTransition
      in={true}
      timeout={350}
      classNames="blog-create"
      unmountOnExit
      appear
    >
      <form className="blog-create">
        <label>Blog Title</label>
        <input
          type="text"
          value={title}
          disabled={disabled}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Content</label>
        <textarea
          value={content}
          disabled={disabled}
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={keyPressEvent}
        ></textarea>
        {disabled && (
          <div className="btn-container">
            <button className="btn-form" onClick={() => setDisabled(false)}>
              Edit Blog
            </button>
            <button className="btn-form" onClick={handleDelete}>
              Delete Blog
            </button>
          </div>
        )}
        {!disabled && (
          <div className="btn-container">
            <button className="btn-form" onClick={updateBlogDetails}>
              Save
            </button>
            <button className="btn-form" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        )}
      </form>
    </CSSTransition>
  );
};

export default Form;
