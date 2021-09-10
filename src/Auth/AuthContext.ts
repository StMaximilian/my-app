import { createContext } from "react";

export type TAuthContext = {
  signIn: (history: any) => void;
  signOut: (history: any) => void;
};

export const AuthContext = createContext<TAuthContext>({
  signIn: () => {},
  signOut: () => {},
});
