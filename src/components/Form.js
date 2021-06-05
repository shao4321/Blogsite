const Form = ({ props }) => {
  const {
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
  } = props;

  return (
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
  );
};

export default Form;
