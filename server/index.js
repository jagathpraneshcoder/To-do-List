const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use([cors(),express.json()])

app.listen(5000, () => {
  console.log("Server is listening on 5000");
});
