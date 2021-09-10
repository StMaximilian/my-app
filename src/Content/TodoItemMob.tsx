import { observer } from "mobx-react-lite";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ToDo from "../Store/ToDoStore";
import { TodoObj } from "../Types";

export interface IToDoProps {
  todo: TodoObj;
  index: number;
  key: number;
}

const TodoItem: React.FC<IToDoProps> = observer((props) => {
  return (
    <div key={props.todo.todoID}>
      <span className="">
        <input
          key={props.todo.todoID}
          type="checkbox"
          checked={props.todo.isFinished}
          onChange={() => ToDo.completeTodo(props.todo.todoID)}
        />
        <strong>{props.index + 1 + "."}</strong>
        &nbsp;
        {props.todo.title}
        &nbsp;
        <button
          type="button"
          className="edit-btn"
          onClick={() => ToDo.editMode(props.todo.todoID)}
        >
          <FaEdit />
        </button>
        &nbsp;
        <button
          type="button"
          className="delete-btn"
          onClick={() => ToDo.removeTodo(props.todo.todoID)}
        >
          <FaTrash />
        </button>
      </span>
    </div>
  );
});

export default TodoItem;
