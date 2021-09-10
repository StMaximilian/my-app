import React from "react";
import ToDoStore from "../Store/ToDoStore";

enum ESortType {
  ASC = "По возвростанию",
  DESC = "По убыванию",
}
//Сделать кнопки на сортировки

const SortTodo: React.FC = () => {

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "ASC") {
      ToDoStore.sortTodos(true)
    } else {
      ToDoStore.sortTodos(false)
    }
  };

  return (
    <form style={{ marginBottom: "1rem" }}>
      {/* <input
        type="radio"
        value="ASC"
        name="sort"
        onChange={onValueChange.bind(this)}
      />
      По возврастанию */}
      <input
        type="radio"
        value="DESC"
        name="sort"
        onChange={onValueChange.bind(this)}
      />
      По убыванию
      <div>
      <button type="reset" onClick={() => (ToDoStore.isASC=true)}>
        Сбросить
      </button>
      </div>
    </form>
  );
};

export default SortTodo;
