const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const {
  getTodo,
  addTodo,
  editTodo,
  completeTodo,
  unarchiveTodo,
  deleteTodo,
} = require("./controller");

app.get("/api/todo", getTodo);
app.post("/api/todo", addTodo);
app.put("/api/todo/:id", editTodo);
app.put("/api/todo/complete/:id", completeTodo);
app.put("/api/todo/unarchive/:id", unarchiveTodo);
app.delete("/api/todo/:id", deleteTodo);

app.listen(4000, () => console.log("Server running on port 4000"));
