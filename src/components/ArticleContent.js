const ArticleContent = ({ title, content, dateWritten, dateEdited }) => {
  return (
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
  );
};

export default ArticleContent;
