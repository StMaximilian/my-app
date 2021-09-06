import useInputValue from "../Functions/InputValue";
import ToDoStore from "../Store/ToDoStore";


const reset = () => {
  ToDoStore.filterValue = "";
  ToDoStore.getTodosStorage();
}

const FindTodo: React.FC = () => {
  const input = useInputValue("");
  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.value().trim()) {
      ToDoStore.filterValue = input.value().trim();
      ToDoStore.getTodosStorage();
      input.clear();
    }
  };

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">Найти</button>
      &nbsp;
      <button type="submit" onClick={() => reset()}>Сбросить</button>
    </form>
  );
};

export default FindTodo;
