import Navbar from "./components/Navbar";
import Create from "./components/Create";
import BlogDetails from "./components/BlogDetails";
import Main from "components/Main";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Main homePage={true} />
        </Route>
        <Route path="/create" component={Create} />
        <Route path="/bookmark" component={Main} />
        <Route path="/blogs/:id" component={BlogDetails} />
      </Switch>
    </Router>
  );
};

export default App;
