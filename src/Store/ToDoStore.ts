import {
  makeObservable,
  observable,
  computed,
  action,
} from "mobx";

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

class Todo {
  isAuthUser= false;
  UserInID =  -1;
  editId= -1;
  isEdit= false;
  todos: TodoObj[]= [];
  curUser= "";
  curUserPass= "";

  // todos = JSON.parse(localStorage.getItem("notes"));

  // get unfinishedTodoCount() {
  //   return this.todos.filter((todo) => !todo.isFinished).length;
  // }

  constructor() {
    makeObservable(this, {
      isAuthUser: observable,
      UserInID: observable,
      editId: observable,
      isEdit: observable,
      todos: observable,
      createTodo: action,
      removeTodo: action,
      editTodo: action,
      completeTodo: action,
      getTodosStorage: action,
      // unfinishedTodoCount: computed,
      curUser: observable,
      curUserPass: observable,
    });
  }

  getAuth() {
    console.log("С мобХ логин" + this.curUser);
    console.log("С мобХ пароль" + this.curUserPass);
    // this.todos = JSON.parse(localStorage.getItem("notes"));
    // const resarr:User[] = JSON.parse(localStorage.getItem("users") || '{}')
    // console.log(resarr)
    const result = JSON.parse(localStorage.getItem("users") || '{}').find(
      (v:User) => v.login === this.curUser && v.pass === this.curUserPass
    );
    console.log(result?.id)
    if (result) {
      this.UserInID = result.id;
      this.isAuthUser = true;
    }
  }

  getTodosStorage() {
    console.log("С мобХ пром айди" + this.UserInID);
    this.todos = JSON.parse(localStorage.getItem("notes") || "[]").filter(
      (v:TodoObj) => v.userID === this.UserInID
    );
    console.log("Массив" + this.todos.length);
  }

  createTodo(newItem: TodoObj) {
    const todos: TodoObj[] = JSON.parse(localStorage.getItem("notes") || "[]");
    todos.push(newItem);
    localStorage.setItem("notes", JSON.stringify(todos));
    this.getTodosStorage();
  }

  removeTodo(id: number) {
    let todos: TodoObj[] = JSON.parse(localStorage.getItem("notes") || '[]');
    todos = todos.filter((v:TodoObj) => v.todoID !== id);
    localStorage.setItem("notes", JSON.stringify(todos));
    this.getTodosStorage();
  }

  editMode(id: number) {
    this.isEdit = true;
    this.editId = id;
  }

  editTodo(newItem: string) {
    let todos: TodoObj[] = JSON.parse(localStorage.getItem("notes")|| '[]');

    todos.map((todoItem) => {
      if (todoItem.todoID === this.editId) {
        todoItem.title = newItem;
      }
    });
    localStorage.setItem("notes", JSON.stringify(todos));
    this.getTodosStorage();
    this.isEdit = false;
    this.editId = -1;
  }

  completeTodo(id: number) {
    console.log('АйдиФ' + id)
    let todos: TodoObj[] = JSON.parse(localStorage.getItem("notes")|| '[]');
    todos = todos.map((todo:TodoObj) => {
      if (todo.todoID === id) {
        todo.isFinished = !todo.isFinished;
      }
      return todo;
    });
    localStorage.setItem("notes", JSON.stringify(todos));
    this.getTodosStorage();
  }
}

export default new Todo();
