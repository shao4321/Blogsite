import { Link } from "react-router-dom";

const Article = ({
  props,
  blogDelete,
  toggleBookmark,
  selectedBlogs,
  handleSelectedBlog,
}) => {
  const { id, title, content, dateWritten, dateEdited, bookmarked } = props;
  return (
    <>
      <div
        className={`article-container ${
          selectedBlogs.has(id) ? "selected" : ""
        }`}
        onClick={(e) => handleSelectedBlog(e, id)}
      >
        <Link to={`/blogs/${id}`}>
          <article>
            <div className="contents">
              <h3>{title}</h3>
              <p className="date">
                Written On: <span>{dateWritten}</span>
              </p>
              <p className="date">
                Last Edited On: <span>{dateEdited}</span>
              </p>
              <p>{content}</p>
            </div>
          </article>
        </Link>
        <div id="icons">
          <i
            className={`fa${bookmarked ? "s" : "r"} fa-bookmark`}
            onClick={() => toggleBookmark(id, bookmarked)}
          ></i>
          <i className="far fa-trash-alt" onClick={() => blogDelete(id)}></i>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Article;
