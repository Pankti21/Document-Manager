import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import FileModule from "../components/FileModule/FileModule";

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path={"/login"}>
                    <Login/>
                </Route>
                <Route path={"/register"}>
                    <Register/>
                </Route>
                <Route path={"/"}>

                </Route>
                <Route exact path="/files">
                    <FileModule/>
                </Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;