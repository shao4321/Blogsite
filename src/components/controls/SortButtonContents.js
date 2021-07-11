import {
  sortAZ,
  sortZA,
  sortWrittenDateON,
  sortWrittenDateNO,
  sortEditedDateON,
  sortEditedDateNO,
} from "./sort";
import { useContext } from "react";
import { AllContext } from "../main/Home";

const SortButtonContents = () => {
  const { setOrder, blogs, setBlogs } = useContext(AllContext);

  const handleSortAZ = (blogs, setBlogs) => {
    setOrder("AZ");
    sortAZ(blogs, setBlogs);
  };
  const handleSortZA = (blogs, setBlogs) => {
    setOrder("ZA");
    sortZA(blogs, setBlogs);
  };
  const handleSortWrittenDate_ON = (blogs, setBlogs) => {
    setOrder("wDateON");
    sortWrittenDateON(blogs, setBlogs);
  };
  const handleSortWrittenDate_NO = (blogs, setBlogs) => {
    setOrder("wDateNO");
    sortWrittenDateNO(blogs, setBlogs);
  };
  const handleSortEditedDate_ON = (blogs, setBlogs) => {
    setOrder("eDateON");
    sortEditedDateON(blogs, setBlogs);
  };
  const handleSortEditedDate_NO = (blogs, setBlogs) => {
    setOrder("eDateNO");
    sortEditedDateNO(blogs, setBlogs);
  };

  return (
    <div id="sort-dropdown" className="dropdown-content">
      <button
        className="sort-btns"
        onClick={() => handleSortAZ(blogs, setBlogs)}
      >
        Sort A to Z
      </button>
      <button
        className="sort-btns"
        onClick={() => handleSortZA(blogs, setBlogs)}
      >
        Sort Z to A
      </button>
      <label>Written Date</label>
      <button
        className="sort-btns"
        onClick={() => handleSortWrittenDate_ON(blogs, setBlogs)}
      >
        Oldest to Newest
      </button>
      <button
        className="sort-btns"
        onClick={() => handleSortWrittenDate_NO(blogs, setBlogs)}
      >
        Newest to Oldest
      </button>
      <label>Edited Date</label>
      <button
        className="sort-btns"
        onClick={() => handleSortEditedDate_ON(blogs, setBlogs)}
      >
        Oldest to Newest
      </button>
      <button
        className="sort-btns"
        onClick={() => handleSortEditedDate_NO(blogs, setBlogs)}
      >
        Newest to Oldest
      </button>
    </div>
  );
};

export default SortButtonContents;
