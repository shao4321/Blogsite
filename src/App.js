import { useState } from "react";
import { allBlogs } from "data/db.json";
import HeaderNav from "./components/HeaderNav";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import Main from "components/Main";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  let storedBlogs = localStorage.getItem("blogs");
  if (!storedBlogs) {
    storedBlogs = JSON.stringify(allBlogs);
    localStorage.setItem("blogs", storedBlogs);
  }

  const [blogs, setBlogs] = useState(JSON.parse(storedBlogs));

  return (
    <Router>
      <HeaderNav />
      <Switch>
        <Route path="/" exact>
          <Main homePage={true} blogs={blogs} setBlogs={setBlogs} />
        </Route>
        <Route path="/create">
          <Create blogs={blogs} setBlogs={setBlogs} />
        </Route>
        <Route path="/bookmark">
          <Main blogs={blogs} setBlogs={setBlogs} />
        </Route>
        <Route path="/blogs/:id">
          <BlogDetails blogs={blogs} setBlogs={setBlogs} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
