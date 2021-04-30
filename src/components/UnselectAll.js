import { useContext } from "react";
import { AllContext } from "./Home";

const UnselectAll = () => {
  const { setSelectedBlogs } = useContext(AllContext);

  return (
    <>
      <button
        className="btn-select"
        onClick={() => setSelectedBlogs(new Set())}
      >
        Unselect All
      </button>
    </>
  );
};

export default UnselectAll;
