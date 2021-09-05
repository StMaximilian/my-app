import { observer } from "mobx-react-lite";
import ToDo from "../Store/ToDoStore";
import "../index.css";
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItemMob";
import AddTodo from "./AddTodoMobX";
import Loader from "../Loader";

const Todo: React.FC = observer(() => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      ToDo.clearTodosStorage();
      ToDo.getTodosStorage();
      setLoad(false);
    }, 1500);
  }, []);

  return (
    <div>
      <AddTodo></AddTodo>
      <ul>
      {load && <Loader />}
        {ToDo.todos.map((todo, index) => {
          return ToDo.todos.length ? (
            <TodoItem todo={todo} key={todo.todoID} index={index} />
          ) : load ? null : (
            <p>Список пуст!</p>
          );
        })}
      </ul>
    </div>
  );
});

export default Todo;
