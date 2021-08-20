import React, { useState } from "react";
import AuthContext from "./AuthContext";

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
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return Auth.signin(() => {
      setUser('user');
      cb();
    });
  };

  const signout = (cb) => {
    return Auth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
