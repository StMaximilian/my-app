import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Private from "../Content/Private";
import Info from "../Content/Info";
import AuthForm from "../Componets/AuthForm";

export default function Navi() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/tasks">Список задач</Link>
            </li>
            <li>
              <Link to="/help">Справка</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/tasks">
            <AuthForm />
            <Private />
          </Route>
          <Route path="/help">
            <h1>1</h1>
          </Route>
          <Route path="/">
            <Info />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
