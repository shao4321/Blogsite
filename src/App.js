import { useState, createContext } from "react";
import { allBlogs } from "data/db.json";
import HeaderNav from "./components/navigation";
import Create from "./components/create";
import BlogDetails from "./components/details";
import Main from "components/main";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

const fetchBlogs = () => {
  let storedBlogs = localStorage.getItem("blogs");
  if (!storedBlogs) {
    storedBlogs = JSON.stringify(allBlogs);
    localStorage.setItem("blogs", storedBlogs);
  }
  return storedBlogs;
};

function getCacheMode() {
  const cacheIsDarkMode = localStorage.getItem("isDarkMode")
  if (cacheIsDarkMode) {
    return JSON.parse(cacheIsDarkMode)
  }
  return false
}

export const AppContext = createContext();

const App = () => {
  const [blogs, setBlogs] = useState(JSON.parse(fetchBlogs()));

  const [darkMode, setDarkMode] = useState(getCacheMode());
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
