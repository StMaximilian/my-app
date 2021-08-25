function Add() {
  inname;
  todos = [];
  isEdit = false;
  editID;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inname) {
      alert("Вы вводите пустое поле");
    } else if (inname && isEdit) {
      this.todos = this.todos.map((item) => {
        if (item.id === editID) {
          return { ...item, title: inname };
        }
        return item;
      });
      inname ='';
      editID = null;
      isEdit =false;
      alert("Изменение произошло");
    } else {
      alert("Заметка добавлена");
      const newItem = { id: new Date().getTime().toString(), title: inname };
      this.todos.push(newItem)
      inname ='';
    }
  };


  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
 
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>Todo List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Input your Todo List"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "Submit!"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default Add;
