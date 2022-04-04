import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import FileModule from "../components/FileModule/FileModule";
import CreateGroup from "../components/group/creategroup";
import HomePage from "../components/group/homepage";
import ViewGroup from "../components/group/viewgroup";
import AddMember from "../components/group/addmember";
import RemoveMember from "../components/group/removemember";
import FileAnalyze from "../components/FileModule/FileAnalyze";

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
                <Route exact path="/analyze/:groupId/:fileId">
                    <FileAnalyze />
                </Route>
                <Route exact path="/creategroup">
                    <CreateGroup />
                </Route>
                <Route exact path="/home">
                    <HomePage />
                </Route>
                <Route exact path="/viewgroup/:id">
                    <ViewGroup />
                </Route>
                <Route exact path="/addmember/:id">
                    <AddMember />
                </Route>
                <Route exact path="/removemember/:id">
                    <RemoveMember />
                </Route>
            </Switch>
        </Router>
    );
}

export default AppRouter;
