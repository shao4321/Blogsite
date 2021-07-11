import { useContext } from "react";
import { AllContext } from "../main/Home";

const ToggleIcon = ({ id, bookmarked }) => {
  const { toggleBookmark, handleDelete } = useContext(AllContext);

  return (
    <div id="icons">
      <i
        className={`fa${bookmarked ? "s" : "r"} fa-bookmark`}
        onClick={() => toggleBookmark(id, bookmarked)}
      ></i>
      <i className="far fa-trash-alt" onClick={() => handleDelete(id)}></i>
    </div>
  );
};

export default ToggleIcon;
