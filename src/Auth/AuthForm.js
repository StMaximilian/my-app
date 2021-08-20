import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation,
} from "react-router-dom";
import AuthContext from "./AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);
  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AuthForm({ onCreate }) {
  let inputlog = useInputValue("");
  let inputpas = useInputValue("");
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  function login(log, pas) {
    // if (
    //   JSON.parse(localStorage.getItem("users")).filter(
    //     (v) => v.login === log && v.pass === pas
    //   )
    // ) {
    // }
    let arr = JSON.parse(localStorage.getItem("users"));
    let usid;
    let flag = false;

    for (let i = 0; i < arr.length; i++) {
      if (log === arr[i].login && pas === arr[i].pass) {
        flag = true;
        usid = arr[i].id;
        break;
      }
    }
    localStorage.setItem("usid", usid);
    console.log(localStorage.getItem("usid"))

    if (flag) {
      alert("Добро пожаловать");
      auth.signin(() => {
        history.replace(from);
      });
    } else {
      alert("Неверный логин или пароль");
    }
  }
  function handleSubmit(event) {
    event.preventDefault();

    if (inputlog.value().trim() && inputpas.value().trim()) {
      onCreate(inputlog.value());
      login(inputlog.value(), inputpas.value());
      inputlog.clear();
      inputpas.clear();
    }
  }

  // function handleChange(event) {
  //   setState({ value: event.target.value });
  // }

  // return (
  //   <div>
  //     <p>You must log in to view the page at {from.pathname}</p>
  //     <button onClick={login}>Log in</button>
  //   </div>
  // );

  return (
    <form name="loginForm" onSubmit={handleSubmit.bind(this)}>
      <div className="container">
        <p>Вы должны быть авторизированы!</p>
        <input {...inputlog.bind} placeholder="Логин"></input>
        &ensp;
        <input type="password" {...inputpas.bind} placeholder="Пароль"></input>
        &ensp;
        <input type="submit" value="Войти"></input>
      </div>
    </form>
  );
}

export default AuthForm;
