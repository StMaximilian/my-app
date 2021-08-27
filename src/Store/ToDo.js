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
  curUser = "";
  curUserPass = "";

  // todos = JSON.parse(localStorage.getItem("notes"));

  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }

  constructor() {
    makeObservable(this, {
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

  getTodosStorage() {
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
    if (result) {
      alert("Добро пожаловать," + this.curUser);
      console.log("С мобХ пром айди" + this.userid);
      this.todos = JSON.parse(localStorage.getItem("notes")).filter(
        (v) => v.userid === this.userid
      );
      console.log("С мобХ пром массив" + this.todos.length);
    } 
    // else {
    //   alert("Неправильный логин и/или пароль");
    // }
  }

  // constructor(todos) {
  //   makeAutoObservable(this);
  // }

  // AddEditTodo(e) {
  //   e.preventDefault();
  //   if (!this.inname) {
  //     alert("Вы вводите пустое поле");
  //   } else if (this.inname && this.isEdit) {
  //     this.todos = this.todos.map((item) => {
  //       if (item.id === this.editID) {
  //         return { ...item, title: this.inname };
  //       }
  //       return item;
  //     });
  //     this.inname = "";
  //     this.editID = null;
  //     this.isEdit = false;
  //     alert("Изменение произошло");
  //     localStorage.setItem("notes", JSON.stringify(this.todos));
  //   } else {
  //     alert("Заметка добавлена");
  //     this.count++;
  //     const newItem = {
  //       id: this.count,
  //       title: this.inname,
  //       date: new Date().getTime().toString(),
  //     };
  //     this.todos.push(newItem);
  //     this.inname = "";
  //     localStorage.setItem("notes", JSON.stringify(this.todos));
  //   }
  // }

  createTodo(newItem) {
    console.log("При добавлении " + this.isEdit);
    if (!this.isEdit) {
      this.todos.push(newItem);
      localStorage.setItem("notes", JSON.stringify(this.todos));
    } else {
      console.log("При добавлении " + newItem);
      this.todos.map((todoItem) => {
        if (todoItem.id === this.editId) {
          todoItem.title = newItem;
        }
      });
      localStorage.setItem("notes", JSON.stringify(this.todos));
      this.isEdit = false;
      this.editId = null;
    }
  }

  removeTodo(id) {
    this.todos = this.todos.filter((v) => v.id !== id);
    localStorage.setItem("notes", JSON.stringify(this.todos));
  }

  editTodo(id) {
    this.isEdit = true;
    this.editId = id;
    console.log(this.isEdit + " " + this.editId);
    // this.todos.map((todoItem) => {
    //   if (todoItem.id === this.editId) {
    //     todoItem.title = text;
    //   }
    // });

    // localStorage.setItem("notes", JSON.stringify(this.todos));
    // this.isEdit = false;
    // this.editId = null;
    // this.newtext = null;

    // const specificItem = this.todos.find((item) => item.id === id);

    // console.log(this.text)
    // console.log(specificItem)
    // specificItem.title=this.text
    // console.log(specificItem.title)
    // console.log(this.isEdit + '' + this.editId)
    // this.newtext=null
  }

  completeTodo(id) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    localStorage.setItem("notes", JSON.stringify(this.todos));
  }
}

export default new Todo();
