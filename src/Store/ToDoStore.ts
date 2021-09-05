import { makeObservable, observable, action } from "mobx";
import { curUser, TodoObj, User } from "../Types";

class Todo {
  isAuthUser: boolean = false;
  UserInID: number = -1;
  editId: number = -1;
  isEdit: boolean = false;
  todos: TodoObj[] = [];
  curUser: string = "";
  curUserPass: string = "";

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
      clearTodosStorage: action,
      curUser: observable,
      curUserPass: observable,
    });
  }

  getAuth() {
    let result: User;
    if (this.isAuthUser) {
      result = JSON.parse(localStorage.getItem("users") || "{}").find(
        (v: User) => v.login === this.curUser && v.id === this.UserInID
      );
    } else {
      result = JSON.parse(localStorage.getItem("users") || "{}").find(
        (v: User) => v.login === this.curUser && v.pass === this.curUserPass
      );
    }

    console.log(result?.id);

    if (result) {
      this.UserInID = result.id;
      this.isAuthUser = true;
      localStorage.setItem("isAuth", JSON.stringify(this.isAuthUser));

      const authUser: curUser = {
        id: result.id,
        login: result.login,
        isAuth: true,
      };
      localStorage.setItem("curUser", JSON.stringify(authUser));
    }
  }

  getTodosStorage() {
    console.log("С мобХ пром айди" + this.UserInID);
    this.todos = (
      JSON.parse(localStorage.getItem("notes") || "[]") as TodoObj[]
    ).filter((v) => v.userID === this.UserInID);
    console.log("Массив" + this.todos.length);
  }

  clearTodosStorage() {
    this.todos = [];
  }

  createTodo(newItem: TodoObj) {
    const todos: TodoObj[] = JSON.parse(localStorage.getItem("notes") || "[]");
    todos.push(newItem);
    localStorage.setItem("notes", JSON.stringify(todos));
    this.getTodosStorage();
  }

  removeTodo(id: number) {
    let todos: TodoObj[] = JSON.parse(localStorage.getItem("notes") || "[]");
    todos = todos.filter((v) => v.todoID !== id);
    localStorage.setItem("notes", JSON.stringify(todos));
    this.getTodosStorage();
  }

  editMode(id: number) {
    this.isEdit = true;
    this.editId = id;
  }

  editTodo(newItem: string) {
    let todos: TodoObj[] = JSON.parse(localStorage.getItem("notes") || "[]");

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
    console.log("АйдиФ" + id);
    let todos: TodoObj[] = JSON.parse(localStorage.getItem("notes") || "[]");
    todos = todos.map((todo) => {
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
