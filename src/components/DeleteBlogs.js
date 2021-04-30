const DeleteBlogs = ({ handleDelete }) => {
  return (
    <>
      <button className="btn-delete" onClick={handleDelete}>
        Delete Selected Blogs
      </button>
    </>
  );
};

export default DeleteBlogs;
