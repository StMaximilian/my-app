import React, { useContext } from "react";
import ToDoStore from "../Store/ToDoStore";
import useInputValue from "../Functions/InputValue";
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

const LogIn: React.FC = () => {
  let inputLog = useInputValue("");
  let inputPas = useInputValue("");
  let history = useHistory();
  let auth = useAuth();
  let location = useLocation();

  const Login = () => {
    let { from }: any = location.state || { from: { pathname: "/" } };

    if (true) {
      auth.signIn(() => {
        history.replace(from);
      });
    }
  };

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputLog.value().trim() && inputPas.value().trim()) {
      console.log("currentUserName: ", inputLog.value());
      console.log("currentUserPass: ", inputPas.value());
      ToDoStore.curUser = inputLog.value();
      ToDoStore.curUserPass = inputPas.value();
      ToDoStore.getAuth();
      if (ToDoStore.isAuthUser) {
        Login();
      }

      inputLog.clear();
      inputPas.clear();
      console.log("MobU: ", ToDoStore.curUser);
      console.log("MobP: ", ToDoStore.curUserPass);
    }
  }

  return ToDoStore.isAuthUser ? null : (
    <>
      <form name="loginForm" onSubmit={handleSubmit}>
        <div className="container">
          <p>Вы должны быть авторизированы!</p>
          <input {...inputLog.bind} placeholder="Логин"></input>
          &ensp;
          <input
            type="password"
            {...inputPas.bind}
            placeholder="Пароль"
          ></input>
          &ensp;
          <input type="submit" value="Войти"></input>
        </div>
      </form>
    </>
  );
};

export default LogIn;
