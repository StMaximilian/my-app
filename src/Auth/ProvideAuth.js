import React, { useState } from "react";
import AuthContext from "./AuthContext";
import ToDo from "../Store/ToDo";

const KEY_AUTHORIZED_USER_NAME = "userName";
const KEY_AUTHORIZED_USER_PASS = "userPass";

//ФФФ
let currentUserName = localStorage.getItem(KEY_AUTHORIZED_USER_NAME);
let currentUserPass = localStorage.getItem(KEY_AUTHORIZED_USER_PASS);
// let currentUserName= localStorage.getItem(KEY_AUTHORIZED_USER_NAME)
// let currentUserPass= ToDo.curUserPass

const Auth = {
  isAuthenticated: false,
  signin(cb) {
    Auth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    Auth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = React.useState(currentUserName);

  const signin = (cb) => {
    return Auth.signin(() => {
      // console.log("U: ", ToDo.curUser);
      // console.log("P: ", ToDo.curUserPass);
      // console.log(currentUserName);
      setUser(currentUserName);
      cb();
      localStorage.setItem(KEY_AUTHORIZED_USER_NAME, currentUserName);
      localStorage.setItem(KEY_AUTHORIZED_USER_PASS, currentUserPass);
    });
  };

  const signout = (cb) => {
    return Auth.signout(() => {
      setUser(null);
      cb();
      ToDo.userid = null;
      ToDo.isAuthUser = false;
      localStorage.removeItem(KEY_AUTHORIZED_USER_NAME);
      localStorage.removeItem(KEY_AUTHORIZED_USER_PASS);
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
