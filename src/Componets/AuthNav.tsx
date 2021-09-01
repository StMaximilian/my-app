import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Info from "../Content/Info";
import ProvideAuth from "../Auth/ProvideAuth";
import LogOut from "../Auth/LogOut";
import Login from "../Auth/Login";
import PrivateRoute from "../Auth/PrivateRoute";
import Todo from "../Content/Todo";


const AuthNav: React.FC = () => {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <LogOut />

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
              <Login></Login>
            </Route>
            <PrivateRoute path="/protected">
              <Todo></Todo>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default AuthNav
