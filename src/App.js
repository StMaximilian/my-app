import React, {useEffect} from "react";
import TodoList from "./ToDo/TodoList";
import Context from "./context";
import Loader from "./Loader";
import { Link, Switch, Route } from 'react-router';
import Nav from './Navbar'
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

const AddTodo = React.lazy(() => import('./ToDo/AddTodo'))

 function App() {
  const [todos,setTodos] = React.useState([])
  const [load, setLoad] = React.useState(true)

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
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
   <Router>
   <Nav />
              <Switch>
                <Route exactly component={Landing} pattern="/" />
                <Route exactly component={Page1} pattern="/path1" />
                <Route exactly component={Page2} pattern="/path2" />
                <Route exactly component={Page3} pattern="/path3" />
                <Route component={Page404} />
              </Switch>
     <div className='wrapper'> 
        <React.Suspense fallback={<p>Loading......</p>}>
        <AddTodo onCreate={addTodo}/>
        </React.Suspense>     
            {load && <Loader/>}
            {todos.length ?  (<TodoList todos={todos} onTog={toggleTodo}/>) :
            load ? null :(<p>No tasks!</p>)} 
        </div>
      </Router>
   </Context.Provider>    
  )
}

export default App




