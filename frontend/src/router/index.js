import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import FileModule from "../components/FileModule/FileModule";
import CreateGroup from "../components/group/creategroup";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/login"}>
          <Login />
        </Route>
        <Route exact path={"/register"}>
          <Register />
        </Route>
        <Route exact path={"/"}></Route>
        <Route exact path={"/files"}>
          <FileModule />
        </Route>
        <Route exact path="/creategroup">
          <CreateGroup />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
