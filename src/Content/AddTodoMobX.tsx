import React from "react";
import ToDo from "../Store/ToDoStore";
import { observer } from "mobx-react-lite";
import useInputValue from "../Functions/InputValue";
import { TodoObj } from "../Types";


const AddTodo: React.FC = observer(() => {

  const input = useInputValue("");
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.value().trim()) {
      if (ToDo.isEdit) {
        ToDo.editTodo(input.value().trim());
      } else {
        const newItem: TodoObj = {
          todoID: Date.now(),
          userID: ToDo.UserInID,
          title: input.value().trim(),
          isFinished: false,
        };
        ToDo.createTodo(newItem);
      }
      input.clear();
    }
    ToDo.isEdit = false;
  };



  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler} >
      <input {...input.bind} />
      <button type="submit">
        {ToDo.isEdit ? "Отредактировать" : "Добавить"}
      </button>
    </form>
  );
});

export default AddTodo
