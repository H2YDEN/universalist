document.addEventListener("DOMContentLoaded", (event) => {
  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");

  const getTodoList = () => {
    axios
      .get("http://localhost:4000/api/todo")
      .then((res) => {
        const todoList = res.data;
        const todoListContainer = document.getElementById("todoList");
        const completedListContainer = document.getElementById("completedList");

        todoListContainer.innerHTML = "";
        completedListContainer.innerHTML = "";

        todoList.forEach((todo) => {
          const listItem = document.createElement("li");
          listItem.classList.add("task-item");
          listItem.setAttribute("data-id", todo.id);

          const taskText = document.createElement("span");
          taskText.textContent = todo.task;
          taskText.classList.add("task-text");

          const buttonContainer = document.createElement("div");
          buttonContainer.classList.add("button-container");

          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.addEventListener("click", () =>
            editTask(todo.id, todo.task)
          );

          const actionButton = document.createElement("button");
          if (todo.completed) {
            actionButton.textContent = "Unarchive";
            actionButton.addEventListener("click", () =>
              unarchiveTask(todo.id)
            );
          } else {
            actionButton.textContent = "Archive";
            actionButton.addEventListener("click", () => completeTask(todo.id));
          }

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", () => deleteTask(todo.id));

          listItem.appendChild(taskText);
          listItem.appendChild(buttonContainer);
          buttonContainer.appendChild(editButton);
          buttonContainer.appendChild(actionButton);
          buttonContainer.appendChild(deleteButton);

          if (!todo.completed) {
            todoListContainer.appendChild(listItem);
          } else {
            completedListContainer.appendChild(listItem);
          }
        });
      })
      .catch((err) => {
        console.error("Error fetching todo list:", err);
      });
  };

  const editTask = (taskId, currentTask) => {
    const newTask = prompt("Enter the new task:", currentTask);
    if (newTask !== null) {
      axios
        .put(`http://localhost:4000/api/todo/${taskId}`, { task: newTask })
        .then((res) => {
          console.log(res.data);
          alert("Task edited successfully!");
          getTodoList();
        })
        .catch((err) => {
          console.error("Error editing task:", err);
          alert("Error editing task. Please try again.");
        });
    }
  };

  const completeTask = (taskId) => {
    axios
      .put(`http://localhost:4000/api/todo/complete/${taskId}`)
      .then((res) => {
        console.log(res.data);
        alert("Task completed successfully!");
        getTodoList();
      })
      .catch((err) => {
        console.error("Error completing task:", err);
        alert("Error completing task. Please try again.");
      });
  };

  const unarchiveTask = (taskId) => {
    axios
      .put(`http://localhost:4000/api/todo/unarchive/${taskId}`)
      .then((res) => {
        console.log(res.data);
        alert("Task unarchived successfully!");
        getTodoList();
      })
      .catch((err) => {
        console.error("Error unarchiving task:", err);
        alert("Error unarchiving task. Please try again.");
      });
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:4000/api/todo/${taskId}`)
      .then((res) => {
        console.log(res.data);

        const taskItem = document.querySelector(`li[data-id="${taskId}"]`);
        if (taskItem) {
          taskItem.remove();
          alert("Task deleted successfully!");
        } else {
          console.error("Task item not found in UI");
          alert("Error deleting task. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        alert("Error deleting task. Please try again.");
      });
  };

  getTodoList();

  const addTodo = (e) => {
    e.preventDefault();
    const task = todoInput.value;
    axios
      .post("http://localhost:4000/api/todo", { task })
      .then((res) => {
        console.log(res.data);
        alert("Task added successfully!");
        getTodoList();
        todoInput.value = "";
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        alert("Error adding task. Please try again.");
      });
  };

  todoForm.addEventListener("submit", addTodo);
});
