import React, { Fragment, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation,
} from "react-router-dom";
import AuthContext from "./AuthContext";
import ToDo from "../Store/ToDoStore";

function useAuth() {
  return useContext(AuthContext);
}

const useInputValue = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
};

const KEY_AUTHORIZED_USER_NAME = "userName";
const KEY_AUTHORIZED_USER_PASS = "userPass";

const Login: React.FC = () => {
  let inputlog = useInputValue("");
  let inputpas = useInputValue("");
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from }: any = location.state || { from: { pathname: "/" } };

  // let login = () => {
  //   auth.signin(() => {
  //     history.replace(from);
  //   });
  // };

  const login2 = () => {
    const checkAuth = localStorage.getItem("isAuth" || "");
    if (checkAuth) {
      auth.signin(() => {
        history.replace(from);
      });
    }
  };

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputlog.value().trim() && inputpas.value().trim()) {
      console.log("currentUserName: ", inputlog.value());
      console.log("currentUserPass: ", inputpas.value());
      localStorage.setItem(KEY_AUTHORIZED_USER_NAME, inputlog.value().trim());
      localStorage.setItem(KEY_AUTHORIZED_USER_PASS, inputpas.value().trim());
      ToDo.curUser = inputlog.value();
      ToDo.curUserPass = inputpas.value();
      ToDo.getAuth();
      if (ToDo.isAuthUser) {
        // login();
        login2();
      } else {
        alert("Вы не существуете в системе");
      }

      inputlog.clear();
      inputpas.clear();
      console.log("MobU: ", ToDo.curUser);
      console.log("MobP: ", ToDo.curUserPass);
    }
  }

  return (
    <Fragment>
      <form name="loginForm" onSubmit={handleSubmit}>
        <div className="container">
          <p>Вы должны быть авторизированы!</p>
          <input {...inputlog.bind} placeholder="Логин"></input>
          &ensp;
          <input
            type="password"
            {...inputpas.bind}
            placeholder="Пароль"
          ></input>
          &ensp;
          <input type="submit" value="Войти"></input>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
