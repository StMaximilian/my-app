import { makeObservable, observable, computed, action } from "mobx";

class Todo {
  flag = false;
  userid;

  todos = JSON.parse(localStorage.getItem("notes"));
  //   todos =  JSON.parse(localStorage.getItem("notes")).filter(
  //     (v) => v.userid === parseInt(localStorage.getItem("usid"))
  //   )

  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }

  constructor(todos) {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      removeTodo: action,
      completeTodo: action,
      unfinishedTodoCount: computed,
    });
  }

  addTodo(todoObj) {
    this.todos.push(todoObj);
    localStorage.setItem("notes", JSON.stringify(this.todos));

  }

  removeTodo(id) {
    this.todos = this.todos.filter((v) => v.id !== id);
    localStorage.setItem("notes", JSON.stringify(this.todos));
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
