import { useContext } from "react";
import { AllContext } from "../main/Home";

const SelectAll = () => {
  const { setSelectedBlogs, blogs } = useContext(AllContext);

  const handleSelectAll = () => {
    const displayBlogsId = blogs.map((blog) => blog.id);
    setSelectedBlogs(new Set(displayBlogsId));
  };

  return (
    <>
      <button className="btn-select" onClick={handleSelectAll}>
        Select All
      </button>
    </>
  );
};

export default SelectAll;
