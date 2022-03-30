import "./App.css";
import AppRouter from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Cookies from 'js-cookie'

function App() {
  const [loading, setLoading] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.defaults.baseURL = 'http://localhost:3001/';
        axios.defaults.headers.common['x-access-token'] = Cookies.get("x-access-token");
        setLoading(false);
    }, []);

  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
