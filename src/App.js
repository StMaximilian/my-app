import React, {useEffect} from "react";
import TodoList from "./ToDo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import Modal from "./Model/Model";

const AddTodo = React.lazy(() => import('./ToDo/AddTodo'))

function App() {
  const [todos,setTodos] = React.useState([])
  const [load, setLoad] = React.useState(true)

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=15')
  .then(response => response.json())
  .then(todos =>setTimeout(() => {
    setTodos(todos)
    setLoad(false)},2500 ) )
  },[])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo =>{
     if(todo.id === id){
       todo.completed = !todo.completed
     }
     return todo
    })
    )
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title){
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
   <Context.Provider value={{removeTodo}}>
     <div className="wrapper">
        <h1>Hello world!</h1>
        <Modal></Modal>
        <React.Suspense fallback={<p>Loading......</p>}>
           <AddTodo onCreate={addTodo}/>
        </React.Suspense>     
        {load && <Loader/>}
        {todos.length ?  (<TodoList todos={todos} onTog={toggleTodo}/>) :
        load ? null :(<p>No tasks!</p>)}
             
      </div>
   </Context.Provider>
        
  )
}

export default App;
