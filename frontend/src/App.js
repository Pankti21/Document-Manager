import AppRouter from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FileModule from "./components/FileModule/FileModule";
import CreateGroup from "./components/group/creategroup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/files">
            <FileModule />
          </Route>
          <Route exact path="/creategroup">
            <CreateGroup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
