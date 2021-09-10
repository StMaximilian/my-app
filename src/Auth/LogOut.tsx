import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import ToDoStore from "../Store/ToDoStore";
import { observer } from "mobx-react-lite";


function useAuth() {
  return useContext(AuthContext);
}

const LogOut = observer(() => {
  let history = useHistory();
  let auth = useAuth();

  return ToDoStore.isAuthUser ? (
    <>
      <p>Пользователь ,{ToDoStore.curUser}</p>
      <button
        onClick={() => {
          auth.signOut(() => history.push("/"));
        }}
      >
        Выйти
      </button>
    </>
  ) : (
      <p>Неавтизированный Пользователь</p>
  );
})
export default LogOut
