import {
  makeObservable,
  makeAutoObservable,
  observable,
  computed,
  action,
} from "mobx";

class Todo {
  isAuthUser = false;
  userid = null;
  editId = null;
  isEdit = false;
  newtext = "404";
  todos = [];
  todos2 = [];
  curUser = "";
  curUserPass = "";
  countuser=2

  // todos = JSON.parse(localStorage.getItem("notes"));

  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }

  constructor() {
    makeObservable(this, {
      countuser: observable,
      isAuthUser: observable,
      newtext: observable,
      userid: observable,
      editId: observable,
      isEdit: observable,
      todos: observable,
      createTodo: action,
      removeTodo: action,
      editTodo: action,
      completeTodo: action,
      getTodosStorage: action,
      unfinishedTodoCount: computed,
      curUser: observable,
      curUserPass: observable,
    });
  }

  getAuth() {
    console.log("С мобХ логин" + this.curUser);
    console.log("С мобХ пароль" + this.curUserPass);
    // this.todos = JSON.parse(localStorage.getItem("notes"));

    let resarr = JSON.parse(localStorage.getItem("users")).filter(
      (v) => v.login === this.curUser && v.pass === this.curUserPass
    );
    let result = resarr.find((obj) => {
      this.userid = obj.id;
      return obj;
    });
    if (this.userid){
      this.isAuthUser=true;
    }
    console.log(this.userid)
  }

  getTodosStorage() {
    console.log("С мобХ пром айди" + this.userid);
    this.todos = JSON.parse(localStorage.getItem("notes")).filter(
      (v) => v.userid === this.userid
    );
    this.todos2 = JSON.parse(localStorage.getItem("notes"))
    console.log("С мобХ пром массив" + this.todos.length);
  }

  createTodo(newItem) {
    this.todos.push(newItem);
    this.todos2.push(newItem);
    localStorage.setItem("notes", JSON.stringify(this.todos2));
  }

  removeTodo(id) {
    this.todos = this.todos.filter((v) => v.id !== id);
    this.todos2 = this.todos2.filter((v) => v.id !== id);
    localStorage.setItem("notes", JSON.stringify(this.todos2));
  }

  editMode(id) {
    this.isEdit = true;
    this.editId = id;
  }

  editTodo(newItem) {
    this.todos.map((todoItem) => {
      if (todoItem.id === this.editId) {
        todoItem.title = newItem;
      }
    });
    this.todos2.map((todoItem) => {
      if (todoItem.id === this.editId) {
        todoItem.title = newItem;
      }
    });
    localStorage.setItem("notes", JSON.stringify(this.todos2));
    this.isEdit = false;
    this.editId = null;
  }

  completeTodo(id) {
    this.todos2 = this.todos2.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    localStorage.setItem("notes", JSON.stringify(this.todos2));
  }
}

export default new Todo();
