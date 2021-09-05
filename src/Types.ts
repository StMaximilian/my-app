
export type TodoObj = {
  todoID: number;
  userID: number;
  title: string;
  isFinished: boolean;
};
export type User = {
  id: number;
  login: string;
  pass: string;
};

export type curUser = {
  id: number;
  login: string;
  isAuth: boolean;
}

export type TInputValues = {
  bind: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  clear: () => void;
  value: () => string;
};




