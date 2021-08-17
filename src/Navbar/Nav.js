import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Home from "../Content/Home";
import LogIn from "../Content/LogIn";
import LogIn from "../Content/Home";

export default class Nav extends React.Component {
  render() {
    return (
      <Router>
        <nav className="Nav">
          <div>
            <aside>
              <Link to="/">
                <img src="logo.svg" />
                <h1>Главная</h1>
              </Link>
            </aside>
            <div>
              <ul>
                <li>
                  <Link to="/Log">Авторизоваться</Link>
                </li>
                <li>
                  <Link to="/Info">Справка</Link>
                </li>
              </ul>
            </div>
          </div>
          <Switch>
            <Route path="/"><h1><Home></Home></h1></Route>

            <Route path="/Log"><h1><LogIn></LogIn></h1></Route>

            <Route path="/Info"><h1><Info></Info></h1></Route>
          </Switch>
        </nav>
      </Router>
    );
  }
}
