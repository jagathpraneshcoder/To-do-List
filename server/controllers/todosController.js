const pool = require("../db");

const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    console.log(req.body);
    console.log(description);
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server not found" });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodo.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "SELECT description FROM todo WHERE todo_id = $1",
      [id]
    );
    if (todo.rows.length > 0) {
      res.json(todo.rows[0]);
    } else {
      res.json("description unavailable");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );

    if (updateTodo.rows.length > 0) {
      res.json("Todo is updated");
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Server error" });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
