import React from "react";
import ToDoStore from "../Store/ToDoStore";
import { observer } from "mobx-react-lite";
import useInputValue from "../Functions/InputValue";
import { TodoObj } from "../Types";

const AddTodo: React.FC = observer(() => {
  const input = useInputValue("");
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.value().trim()) {
      if (ToDoStore.isEdit) {
        ToDoStore.editTodo(input.value().trim());
      } else {
        const newItem: TodoObj = {
          todoID: Date.now(),
          userID: ToDoStore.UserInID,
          title: input.value().trim(),
          isFinished: false,
        };
        ToDoStore.createTodo(newItem);
      }
      input.clear();
    }
    ToDoStore.isEdit = false;
  };

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">
        {ToDoStore.isEdit ? "Отредактировать" : "Добавить"}
      </button>
    </form>
  );
});

export default AddTodo;
