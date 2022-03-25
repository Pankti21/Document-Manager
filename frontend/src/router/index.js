import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";

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
            </Switch>
        </Router>
    );
}

export default AppRouter;