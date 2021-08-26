import { observer } from "mobx-react-lite";
import ToDo from "../Store/ToDo";
import "../index.css";
import { useEffect } from "react";
import TodoItem from "./TodoItemMob";
import AddTodo from "./AddTodoMobX";

const Todo = observer(() => {
  useEffect(() => {
    console.log("getTodo");
    ToDo.getTodosStorage();
  }, []);

  function addTodo(title) {
    if (!ToDo.isEdit) {
      const newItem = {
        id: Date.now(),
        userid: parseInt(localStorage.getItem("usid")),
        title,
        completed: false,
      };
      ToDo.createTodo(newItem);
    } else {
      const newItem = title;
      ToDo.createTodo(newItem);
    }
  }

  return (
    <div>
      <AddTodo onCreate={addTodo}></AddTodo>
      <ul>
        {ToDo.todos.map((todo, index) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              index={index}
              text={ToDo.newtext}
            />
          );
        })}
      </ul>
    </div>
  );
});

export default Todo;
