import { observer } from "mobx-react-lite";
import ToDo from "../Store/ToDoStore";
import "../index.css";
import React, { useEffect } from "react";
import TodoItem from "./TodoItemMob";
import AddTodo from "./AddTodoMobX";

const Todo: React.FC = observer(() => {
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
              key={todo.todoID}
              index={index}
            />
          );
        })}
      </ul>
    </div>
  );
});

export default Todo;


