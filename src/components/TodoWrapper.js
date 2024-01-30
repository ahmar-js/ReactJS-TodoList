import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import {v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodos(savedTodos);
      }, []);
  
      const addTodo = (todo) => {
        const newTodos = [ ...todos,{id:uuidv4(),task:todo,completed:false,isEditing:false}] 
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
        console.log(newTodos)
      };
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    }
    const deleteTodo = id => {
        // filtering each todo that is not euqal to todo id
        // Basically if the todo.id is not equal to the id we are passing then we will return the todo value
        setTodos(todos.filter(todo => todo.id !== id))
        // Update local storage after deleting the todo
        localStorage.setItem('todos', JSON.stringify(todos.filter(todo => todo.id !== id)));
    }
  return (
    <div className='TodoWrapper'>
        <h1>To Do Things!</h1>
        <TodoForm addTodo={addTodo} />
        {/* Generate Todo for each value in the state */}
        {todos.map((todo, index) => (
    <Todo
        task={todo}
        key={index}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
    />
))}

    </div>
  )
}
