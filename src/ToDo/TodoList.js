import React from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

const styles = {
    ul:{
        listStyle: 'none',
        margin: 0,
        padding: 0
    }
}

function TodoList(actions){
    return(
        <ul style={styles.ul}>
            {actions.todos.map((todo,index) =>{
                return <TodoItem todo={todo} key={todo.id} 
                index={index} onChange={actions.onTog}/>
            })}
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onTog: PropTypes.func.isRequired
}

export default TodoList