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

  return (
    <div>
      <AddTodo></AddTodo>
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


