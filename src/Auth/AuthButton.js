import React, { useContext } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import AuthContext from "./AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

export default function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}
