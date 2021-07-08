import { useState, createContext } from "react";
import { allBlogs } from "data/db.json";
import HeaderNav from "./components/HeaderNav";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import Main from "components/Main";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

export const AppContext = createContext();

const App = () => {
  let storedBlogs = localStorage.getItem("blogs");
  if (!storedBlogs) {
    storedBlogs = JSON.stringify(allBlogs);
    localStorage.setItem("blogs", storedBlogs);
  }

  const [blogs, setBlogs] = useState(JSON.parse(storedBlogs));

  const [darkMode, setDarkMode] = useState(false);
  const white = "rgb(253, 239, 239)";
  const black = "rgba(0, 0, 0, 0.8)";
  const bgColor = darkMode ? black : white;
  const fontColor = darkMode ? white : black;

  const appStyle = {
    backgroundColor: bgColor,
    color: fontColor,
    minHeight: "100vh",
  };

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      <div style={appStyle}>
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
      </div>
    </AppContext.Provider>
  );
};

export default App;
