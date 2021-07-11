const DeleteButton = ({ handleDeleteBlogs }) => {
  return (
    <button className="btn-delete" onClick={handleDeleteBlogs}>
      Delete Selected Blogs
    </button>
  );
};

export default DeleteButton;
