import React from "react";
import { AuthContext } from "./AuthContext";
import ToDo from "../Store/ToDoStore";

type Tcb = () => void

type TAuth = {
  signIn: (cb: Tcb) => void
  signOut: (cb: Tcb) => void 
}

type TSignIn =  (cb: Tcb) => void
type TSignOut =  (cb: Tcb) => void


type TuserAuthProvideUserReturn = {
  signIn: TSignIn
  signOut: TSignOut
}

type TuserProvideAuth = () => TuserAuthProvideUserReturn


const ProvideAuth:React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

const auth: TAuth = {
  signIn(cb: Tcb) {
    setTimeout(cb, 100); // fake async
  },
  signOut(cb:Tcb) {
    setTimeout(cb, 100);
  },
};

const useProvideAuth: TuserProvideAuth = ()=> {

  const signIn:TSignIn = (cb: Tcb) => {
    return auth.signIn(() => {
      cb();
    });
  };

  const signOut:TSignOut = (cb: Tcb) => {
    return auth.signOut(() => {
      cb();
      const curUser={
        id: 0,
        login: 'test',
        isAuth: false
    }
    ToDo.curUser='test'
    localStorage.setItem('curUser',JSON.stringify(curUser))
    ToDo.isAuthUser=false
    });
  };

  return {
    signIn,
    signOut,
  };
}

export default ProvideAuth



