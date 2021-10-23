import React from "react";

//Import Components
import Dashboard from "./Dashboard";

//Import React-Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function Routes({ code }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard code={code} />
        </Route>
      </Switch>
    </Router>
  );
}
