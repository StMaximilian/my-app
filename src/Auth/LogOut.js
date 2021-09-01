import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import AuthContext from "./AuthContext";

const KEY_AUTHORIZED_USER_NAME = "userName";

function useAuth() {
  return useContext(AuthContext);
}

export default function LogOut() {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <>
      <p>Пользователь ,{localStorage.getItem(KEY_AUTHORIZED_USER_NAME)}</p>
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Выйти
      </button>
    </>
  ) : (
      <p>Неавтизированный Пользователь</p>
  );
}
