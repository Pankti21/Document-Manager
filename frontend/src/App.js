import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FileModule from './components/FileModule/FileModule';

function App() {
  return (
    <div className="App">
      Document Manager
      <Router>
        <Switch>
          <Route exact path = "/files">
            <FileModule/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
