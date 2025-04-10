import React,{useState} from "react";
import axios from "axios"
import "./InputTodo.css"

function InputTodo(){

    const [description,setDescription] = useState("");

    const onSubmitResponse = async (e)=>{
        e.preventDefault(); 
        try {
            const body = {description};
            console.log(description);
           /* 
            const response = await fetch("http://localhost:5000/todos",
                {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(body)
                }
            );
            console.log(response);*/
            
            const response = await axios.post("http://localhost:5000/todos",
                body,
                {
                    headers:{
                        "content-type" : "application/json"
                    }

                }
            )
            window.location = '/';
            
        } catch (error) {
            console.error(error.message);
        }
    }

    return(
        <>
            <div className="heading">Pern Todo List</div>
            <form className="input-field" onSubmit={onSubmitResponse}>
                <input type="text" className="form-control" 
                    value={description}
                    onChange={e=>{
                        setDescription(e.target.value);
                    }}
                />
                <button className="btn btn-success">Add</button>
            </form>

        </>
    );
}

export default InputTodo;