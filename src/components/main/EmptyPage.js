import { Link } from "react-router-dom";

export default function EmptyPage() {
  return (
    <div className="homeSubPage">
      <h1>No Blogs To Display</h1>
      <Link to="/create">
        <button className="styled-btn">Create One</button>
      </Link>
    </div>
  );
}
