import {
  makeObservable,
  makeAutoObservable,
  observable,
  computed,
  action,
} from "mobx";

class Todo {
  flag = false;
  userid = null;
  editId = null;
  isEdit = false;
  inname = '';
  count = 10;
  // todos=[]

  todos = JSON.parse(localStorage.getItem("notes"));
  //   todos =  JSON.parse(localStorage.getItem("notes")).filter(
  //     (v) => v.userid === parseInt(localStorage.getItem("usid"))
  //   )

  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }

  constructor(todos) {
    makeObservable(this, {
      flag: observable,
      userid: observable,
      editId: observable,
      isEdit: observable,
      inname: observable,
      todos: observable,
      AddEditTodo: action,
      removeTodo: action,
      editTodo: action,
      completeTodo: action,
      unfinishedTodoCount: computed,
      count: observable,
    });
  }

  // constructor(todos) {
  //   makeAutoObservable(this);
  // }

  AddEditTodo(e) {
    e.preventDefault();
    if (this.inname === '') {
      alert("Вы вводите пустое поле");
    } else if (this.inname && this.isEdit) {
      this.todos = this.todos.map((item) => {
        if (item.id === this.editID) {
          return { ...item, title: this.inname };
        }
        return item;
      });
      this.inname = "";
      this.editID = null;
      this.isEdit = false;
      alert("Изменение произошло");
      localStorage.setItem("notes", JSON.stringify(this.todos));
    } else {
      alert("Заметка добавлена");
      this.count++;
      const newItem = {
        id: this.count,
        title: this.inname,
        date: new Date().getTime().toString(),
      };
      this.todos.push(newItem);
      this.inname = "";
      localStorage.setItem("notes", JSON.stringify(this.todos));
    }
  }

  removeTodo(id) {
    this.todos = this.todos.filter((v) => v.id !== id);
    localStorage.setItem("notes", JSON.stringify(this.todos));
  }

  editTodo(id) {
    const specificItem = this.todos.find((item) => item.id === id);
    this.isEdit = true;
    this.editId = id;
    this.bufname = specificItem.title;
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
