//Import styles
import "../styles/App.css";

//Import Components
import Dashboard from "./Dashboard";
import Login from "./Login";
import PlaylistPage from "./PlaylistPage";
import ArtistPage from "./ArtistPage";

//Import React-Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {code ? <Dashboard code={code} /> : <Login />}
          </Route>
          <Route path="/playlist">
            <PlaylistPage />
          </Route>
          <Route path="/artists/:artist">
            <ArtistPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
