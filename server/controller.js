let todoList = [];
let deletedTasks = [];

module.exports = {
  getTodo: (req, res) => {
    res.status(200).send(todoList);
  },
  addTodo: (req, res) => {
    const { task } = req.body;
    todoList.push({ id: todoList.length + 1, task });
    res.status(200).send("Task added successfully!");
  },
  editTodo: (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    todoList[id - 1] = { id: parseInt(id), task };
    res.status(200).send("Task edited successfully!");
  },
  completeTodo: (req, res) => {
    const { id } = req.params;
    const todoIndex = todoList.findIndex((todo) => todo.id === parseInt(id));

    if (todoIndex === -1) {
      return res.status(404).send("Task not found");
    }

    todoList[todoIndex].completed = true;
    res.status(200).send("Task completed successfully!");
  },
  unarchiveTodo: (req, res) => {
    const { id } = req.params;
    const todoIndex = todoList.findIndex((todo) => todo.id === parseInt(id));

    if (todoIndex === -1) {
      return res.status(404).send("Task not found");
    }

    todoList[todoIndex].completed = false;
    res.status(200).send("Task unarchived successfully!");
  },
  deleteTodo: (req, res) => {
    const { id } = req.params;
    todoList = todoList.filter((todo) => todo.id !== parseInt(id));
    res.status(200).send("Task deleted successfully!");
  },
};
