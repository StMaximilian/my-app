import { makeObservable, observable, action, computed } from "mobx";
import { curUser, TodoObj, User } from "../Types";

class Todo {
  isAuthUser: boolean = false;
  UserInID: number = -1;
  editId: number = -1;
  isEdit: boolean = false;
  private _todos: TodoObj[] = [];
  curUser: string = "";
  curUserPass: string = "";
  filterValue: string = "";
  isSort: boolean = false;
  isASC: boolean = false;

  constructor() {
    makeObservable<Todo, "_todos">(this, {
      isAuthUser: observable,
      _todos: observable,
      UserInID: observable,
      editId: observable,
      isEdit: observable,
      createTodo: action,
      removeTodo: action,
      editTodo: action,
      completeTodo: action,
      getTodosStorage: action,
      curUser: observable,
      curUserPass: observable,
      filterValue: observable,
      isSort: observable,
      isASC: observable,
      ToDoList: computed,
      sortTodos: action,
    });
  }

  get ToDoList() {
    console.log("!");
    let data = this._todos;

    if (this.isAuthUser) {
      console.log("Вошли в авиоризацию");
      data = data.filter((v) => v.userID === this.UserInID);
    }

    if (this.filterValue) {
      data = data.filter((v) => v.title.indexOf(this.filterValue) !== -1);
    }

    if (this.isSort) {
      if (this.isASC) {
        data = data.sort((a, b) => (a.todoID > b.todoID ? 1 : -1));
      } else {
        data = data.sort((a, b) => (a.todoID < b.todoID ? 1 : -1));
      }
    }
    return data;
  }

  set ToDoList(value: TodoObj[]) {
    console.log("Проверка сеттера");
    this._todos = value;
    localStorage.setItem("notes", JSON.stringify(value));
    console.log(value);
    // this.getTodosStorage();
  }

  getAuth() {
    let result: User;
    if (this.isAuthUser) {
      result = JSON.parse(localStorage.getItem("users") || "{}").find(
        (v: User) => v.id === this.UserInID
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

      const authUser: curUser = {
        id: result.id,
        login: result.login,
        isAuth: true,
      };
      localStorage.setItem("curUser", JSON.stringify(authUser));
    }
  }

  sortTodos(isA: boolean) {
    this.isSort = true;
    this.isASC = isA;
  }

  getTodosStorage() {
    console.log("С мобХ пром айди" + this.UserInID);
    this._todos = JSON.parse(
      localStorage.getItem("notes") || "[]"
    ) as TodoObj[];
    console.log(this._todos);
  }

  createTodo(newItem: TodoObj) {
    const todos: TodoObj[] = this._todos;
    todos.push(newItem);
    this.ToDoList = todos;
  }

  removeTodo(id: number) {
    let todos: TodoObj[] = this._todos;
    todos = todos.filter((v) => v.todoID !== id);
    this.ToDoList = todos;
  }

  editMode(id: number) {
    this.isEdit = true;
    this.editId = id;
  }

  editTodo(newItem: string) {
    let todos: TodoObj[] = this._todos;

    todos.map((todoItem) => {
      if (todoItem.todoID === this.editId) {
        todoItem.title = newItem;
      }
    });

    this.ToDoList = todos;
    this.isEdit = false;
    this.editId = -1;
  }

  completeTodo(id: number) {
    let todos: TodoObj[] = this._todos;
    todos = todos.map((todo) => {
      if (todo.todoID === id) {
        todo.isFinished = !todo.isFinished;
      }
      return todo;
    });
    this.ToDoList = todos;
  }
}

export default new Todo();
