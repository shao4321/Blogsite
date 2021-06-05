import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import SortButtonContents from "./SortButtonContents";

const SortButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownFocus = (e) => {
    // Toggle on / off when button is clicked
    if (e.target.className === "dropbtn") {
      setShowDropdown(!showDropdown);
      return;
    }
    // Dropdown only when buttons and not the labels in dropdown list are clicked
    return e.currentTarget && e.target.tagName !== "LABEL"
      ? setShowDropdown(true)
      : setShowDropdown(false);
  };

  return (
    <div
      className="dropdown"
      onClick={(e) => handleDropdownFocus(e)}
      // Only blur when user click outside the div and its child elements except for 'labels'
      onBlur={(e) =>
        e.relatedTarget && e.relatedTarget.className === "sort-btns"
          ? setShowDropdown(true)
          : setShowDropdown(false)
      }
    >
      <button className="dropbtn">
        <i className="fas fa-angle-left"></i> Sort by
      </button>
      <CSSTransition
        in={showDropdown}
        timeout={350}
        classNames="dropdown-content"
        unmountOnExit
        appear
      >
        <SortButtonContents />
      </CSSTransition>
    </div>
  );
};

export default SortButton;
