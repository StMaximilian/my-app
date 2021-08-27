import React, { Fragment, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  useHistory,
  useLocation,
} from "react-router-dom";
import AuthContext from "./AuthContext";
import ToDo from "../Store/ToDo";

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

const KEY_AUTHORIZED_USER_NAME = 'userName';
const KEY_AUTHORIZED_USER_PASS = 'userPass';


function Login() {
  let inputlog = useInputValue("");
  let inputpas = useInputValue("");
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();


  let { from } = location.state || { from: { pathname: "/" } };
  // const [userName, setUserName] = useState('');
  // const [userPass, setUserPass] = useState('');


  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };


  function handleSubmit(event) {
    event.preventDefault();
    

    if (inputlog.value().trim() && inputpas.value().trim()) {
      console.log('currentUserName: ', inputlog.value());
      console.log('currentUserPass: ', inputpas.value());

      localStorage.setItem(KEY_AUTHORIZED_USER_NAME,inputlog.value());
      localStorage.setItem(KEY_AUTHORIZED_USER_PASS,inputpas.value());
      ToDo.curUser=inputlog.value()
      ToDo.curUserPass=inputpas.value()
      // ToDo.isAuthUser      
      login();
      inputlog.clear();
      inputpas.clear();
      console.log('MobU: ', ToDo.curUser);
      console.log('MobP: ', ToDo.curUserPass);
    }
  }

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default Login;
