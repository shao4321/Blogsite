import { Link } from "react-router-dom";
import ArticleContent from "./ArticleContent";
import ToggleIcon from "./ToggleIcon";

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
          <ArticleContent
            title={title}
            content={content}
            dateWritten={dateWritten}
            dateEdited={dateEdited}
          />
        </Link>
        <ToggleIcon
          id={id}
          bookmarked={bookmarked}
          toggleBookmark={toggleBookmark}
          blogDelete={blogDelete}
        />
      </div>
      <hr />
    </>
  );
};

export default Article;
