import { observer } from "mobx-react-lite";
import ToDoStore from "../Store/ToDoStore";
import "../index.css";
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItemMob";
import AddTodo from "./AddTodoMobX";
import Loader from "../Loader";
import FindTodo from "./FindTodo";
import SortTodo from "./SortTodo";

const Todo: React.FC = observer(() => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, []);

  return (
    <div>
      <div>
        <AddTodo />
        <FindTodo />
        <SortTodo/>
      </div>
      <ul>
        {load ? (
          <Loader />
        ) : (
          <div>
            {ToDoStore.ToDoList.map((todo, index) => {
              return ToDoStore.ToDoList.length ? (
                <TodoItem todo={todo} key={todo.todoID} index={index} />
              ) : (
                <p>Список пуст!</p>
              );
            })}
          </div>
        )}
      </ul>
    </div>
  );
});

export default Todo;
