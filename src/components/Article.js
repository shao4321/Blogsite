import { Link } from "react-router-dom";
import ArticleContent from "./ArticleContent";
import ToggleIcon from "./ToggleIcon";
import { useContext } from "react";
import { AllContext } from "./Home";

const Article = ({ props }) => {
  const { id, title, content, dateWritten, dateEdited, bookmarked } = props;
  const { selectedBlogs, handleSelectedBlog } = useContext(AllContext);

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
        <ToggleIcon id={id} bookmarked={bookmarked} />
      </div>
      <hr />
    </>
  );
};

export default Article;
