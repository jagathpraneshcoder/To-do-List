const express = require("express");
const app = express();
const cors = require("cors");

const todosRouter = require("./routes/todos");

//middleware
app.use(cors());
app.use(express.json());

//routers
app.use("/", todosRouter);

app.listen(5000, () => {
  console.log("Server is listening on 5000");
});
