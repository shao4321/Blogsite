const ToggleIcon = ({ id, bookmarked, toggleBookmark, blogDelete }) => {
  return (
    <div id="icons">
      <i
        className={`fa${bookmarked ? "s" : "r"} fa-bookmark`}
        onClick={() => toggleBookmark(id, bookmarked)}
      ></i>
      <i className="far fa-trash-alt" onClick={() => blogDelete(id)}></i>
    </div>
  );
};

export default ToggleIcon;
