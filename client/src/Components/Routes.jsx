import React from "react";

//Import Components
import Dashboard from "./Dashboard";
import ArtistPage from "./ArtistPage";

//Import React-Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Routes({ code }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard code={code} />
        </Route>
        <Route path="/artists/:artist">
          <ArtistPage />
        </Route>
      </Switch>
    </Router>
  );
}
