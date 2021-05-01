const FormCreate = ({ props }) => {
  const {
    addCreateBlog,
    title,
    setTitle,
    content,
    setContent,
    keyPressEvent,
    isPending,
  } = props;

  return (
    <form className="blog-create" onSubmit={addCreateBlog}>
      <label>Blog Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <label>Blog Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
  );
};

export default FormCreate;
