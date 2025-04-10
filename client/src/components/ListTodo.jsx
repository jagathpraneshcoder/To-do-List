import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTodo from "./editTodo";

function ListTodo(){

  const [todos,setTodos] = useState([]);

  const getTodo = async ()=>{
    try{
      const response = await axios.get("http://localhost:5000/todos");
      const jsonData = response.data;
      setTodos(jsonData);
      /*
        const response = await fetch("http://localhost:5000/todos")
        const jsonData = reponse.json()
        console.log(jsonData)
      */
    }catch(error){
      console.error(error.message);
    }
  }

  useEffect( ()=>{
    getTodo();
  },[])

  const deleteTodo = async (id)=>{
    try {
      const deleteResponse = await axios.delete(`http://localhost:5000/todos/${id}`)
      /*
        fetch(`http://localhost:5000/todos/${id}`,{
          method : "DELETE"
        });
      */

      console.log(deleteResponse.data);
      alert(deleteResponse.data);
      setTodos( todos.filter( todo=> todo.todo_id !== id));
    } catch (error) {
        console.error(error.message);
    }
  }

  return(
    <>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
          todos.map(todo=>(
                  <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td>
                      <EditTodo key={todo.todo_id} todo={todo}/>
                    </td>
                    <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)} >Delete</button></td>
                  </tr>
              )
            )
          }
        </tbody>
      </table>
    </>
  );
}

export default ListTodo;

{/* <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>
          <tr>
            <td>Mary</td>
            <td>Moe</td>
            <td>mary@example.com</td>
          </tr>
          <tr>
            <td>July</td>
            <td>Dooley</td>
            <td>july@example.com</td>
          </tr>
        </tbody>
  */
}