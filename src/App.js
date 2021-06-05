import HeaderNav from "./components/HeaderNav";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import Main from "components/Main";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  const baseURL = "http://localhost:5000/blogs";

  return (
    <Router>
      <HeaderNav />
      <Switch>
        <Route path="/" exact>
          <Main homePage={true} baseURL={baseURL} />
        </Route>
        <Route path="/create">
          <Create baseURL={baseURL} />
        </Route>
        <Route path="/bookmark" component={Main}>
          <Main baseURL={baseURL} />
        </Route>
        <Route path="/blogs/:id">
          <BlogDetails baseURL={baseURL} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
