import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import AuthNav from "./Componets/AuthNav";
import { curUser } from "./Types";
import ToDoStore from "./Store/ToDoStore";

const App: React.FC = observer(() => {
  useEffect(() => {
    let checkAuth: curUser = JSON.parse(
      localStorage.getItem("curUser") || "[]"
    ) as curUser;
    if (checkAuth.isAuth) {
      ToDoStore.UserInID = checkAuth.id;
      ToDoStore.isAuthUser = checkAuth.isAuth;
      ToDoStore.curUser = checkAuth.login;
    }
    ToDoStore.getAuth()
    console.log( ToDoStore.UserInID + " вход " + ToDoStore.isAuthUser)

    //1.Первый заход проверка на isAuth в LS занести в айди
    //1.1. Авторизация в ЛС на объект (айди и флаг на авторизацию)
    //2. if (isAuth) получение данных(имя и айди) getAuth()
  }, []);

  return (
    <div>
      <h1>Тут должна быть шапка</h1>
      <AuthNav />
      <h2>А тут подвал</h2>
    </div>
  );
});

export default App;
