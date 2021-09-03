import React, { ReactNode, useContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

interface INavProps {
	children: ReactNode;
  path: string,
  state?: any,
}

const PrivateRoute: React.FC<INavProps> = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuth ? (
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
}
export default PrivateRoute


