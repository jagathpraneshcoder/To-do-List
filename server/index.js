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
      "INSERT INTO todo (description) VALUES($1)",
      [description]
    );

    res.json(newTodo);
    res.sendStatus(200);
  }catch(err){
    console.error(err.message);
  }
  
})

app.listen(5000, () => {
  console.log("Server is listening on 5000");
});
