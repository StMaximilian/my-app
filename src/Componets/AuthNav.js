import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Info from "../Content/Info";
import Private from "../Content/Private";
import ProvideAuth from "../Auth/ProvideAuth";
import AuthButton from "../Auth/AuthButton";
import AuthForm from "../Auth/AuthForm";
import PrivateRoute from "../Auth/PrivateRoute";

function checklp(log, pass) {
  console.log(log + " " + pass);
}

export default function AuthNav() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <AuthButton />

          <ul>
            <li>
              <Link to="/public">Главная</Link>
            </li>
            <li>
              <Link to="/protected">Список задач</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/public">
              <Info></Info>
            </Route>
            <Route path="/login">
              <AuthForm onCreate={checklp}></AuthForm>
            </Route>
            <PrivateRoute path="/protected">
              <Private></Private>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
