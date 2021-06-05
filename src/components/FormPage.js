import { useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Form from "./Form";

const FormPage = ({ props }) => {
  const { blog, setBlog, id, blogs, setBlogs } = props;
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [prevTitle, setPrevTitle] = useState(blog.title);
  const [prevContent, setPrevContent] = useState(blog.content);
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

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
        update();
        setPrevTitle(title);
        setPrevContent(content);
      } else {
        setTitle(prevTitle);
        setContent(prevContent);
      }
    }
    setDisabled(true);
  };

  const update = () => {
    const datetime = new Date();
    const dateEdited = `${datetime.getDate()}/${
      datetime.getMonth() + 1
    }/${datetime.getFullYear()}, ${datetime.toLocaleTimeString()} `;
    const newBlog = { ...blog, title, content, dateEdited };
    setBlog(newBlog);

    const updatedBlogs = blogs.map((blog) => (blog.id === id ? newBlog : blog));
    console.log(updatedBlogs);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    history.push("/");
  };

  const updateBlogDetails = (e) => {
    e.preventDefault();
    update();
    history.push("/");
  };

  return (
    <CSSTransition
      in={true}
      timeout={350}
      classNames="blog-create"
      unmountOnExit
      appear
    >
      <Form
        props={{
          title,
          setTitle,
          content,
          setContent,
          disabled,
          setDisabled,
          keyPressEvent,
          handleDelete,
          updateBlogDetails,
          cancelEdit,
        }}
      />
    </CSSTransition>
  );
};

export default FormPage;
