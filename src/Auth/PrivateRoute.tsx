import React from "react";
import { Route, Redirect } from "react-router-dom";
import ToDoStore from "../Store/ToDoStore";

interface INavProps {
  path: string;
  state?: any;
}

const PrivateRoute: React.FC<INavProps> = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        ToDoStore.isAuthUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
