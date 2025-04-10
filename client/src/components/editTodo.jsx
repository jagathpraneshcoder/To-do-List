import axios from "axios";
import React,{useState} from "react";

function editTodo({todo}){

  const [description,setDescription] = useState(todo.description);
  
  const editFunction = async (e)=>{
    e.preventDefault();
    try {
      const body = {description}
      const response = await axios.put(`http://localhost:5000/todos/${todo.todo_id}`,
        body,
          {
            headers:{
              "content-type" : "application/json"
            } 
          }
        )
        console.log(response.data);
        alert(response.data);
        window.location='/';

     } catch (error) {
        console.error(error.message);
    }
  }
  
  return(
    <>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
      Edit
      </button>

      <div class="modal fade" id={`id${todo.todo_id}`} onClick={ ()=>{ setDescription(todo.description) } }>
      <div class="modal-dialog">
      <div class="modal-content">

      <div class="modal-header">
      <h4 class="modal-title">Edit Todo</h4>
      <button type="button" class="close" data-dimiss="modal" onClick={ ()=>{ setDescription(todo.description) } }>&times;</button>
     
      </div>

      <div class="modal-body">
      <input  type="text" className="form-control" value={description} onChange={ e=>{ setDescription(e.target.value) }}/>
      </div>

      <div class="modal-footer">
      <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={ e =>editFunction(e)}>Edit</button>
      <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={ ()=>{ setDescription(todo.description) } }>Close</button>
      </div>

      </div>
      </div>
      </div>
    </>
  )
};

export default editTodo;