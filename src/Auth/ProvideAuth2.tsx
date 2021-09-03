import React, { useState } from "react";
import AuthContext from "./AuthContext";
import ToDo from "../Store/ToDoStore";

const KEY_AUTHORIZED_USER_NAME = "userName";
const KEY_AUTHORIZED_USER_PASS = "userPass";




const ProvideAuth:React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

const Auth = {
  isAuthenticated: false,
  signin(cb: any) {
    setTimeout(cb, 100); // fake async
  },
  signout(cb:any) {
    setTimeout(cb, 100);
  },
};

const useProvideAuth = ()=> {
  const [isAuth, setAuth] = React.useState(false);

  const signin = (cb: any) => {
    return Auth.signin(() => {
      setAuth(true);
      cb();
    });
  };

  const signout = (cb: any) => {
    return Auth.signout(() => {
      setAuth(false);  
      cb();
      ToDo.UserInID = -1;
      ToDo.isAuthUser = false;
      ToDo.clearTodosStorage()
      localStorage.removeItem('isAuth');
      localStorage.removeItem(KEY_AUTHORIZED_USER_NAME);
      localStorage.removeItem(KEY_AUTHORIZED_USER_PASS);
    });
  };

  return {
    isAuth,
    signin,
    signout,
  };
}

export default ProvideAuth



