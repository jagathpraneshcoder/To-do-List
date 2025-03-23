const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors())
app.use(express.json())

//routers

//create a todo
app.post("/todos",async(req,res)=>{
  try{
    const {description} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
    res.sendStatus(200);
  }catch(err){
    console.error(err.message);
  }
  
})

//to get all todo
app.get("/todos",async (req,res)=>{
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
    console.log(allTodo);
    res.json(allTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
})

//to get a todo
app.get("/todos/:id",async (req,res)=>{
  try {
    const {id} = req.params;
    const todo = await pool.query(
        "SELECT description FROM todo WHERE todo_id = $1",
        [id]
      );
    if(todo.rows.length > 0){
      res.json(todo.rows);
    }
    else{
      res.json("description unavailable");
    }
  } catch (error) {
      console.log(error.message);
      res.json(error);
  }
})

app.listen(5000, () => {
  console.log("Server is listening on 5000");
});
