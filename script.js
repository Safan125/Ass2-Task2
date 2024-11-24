// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.querySelector(".task-list");

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskAction);
document.addEventListener("DOMContentLoaded", loadTasks);

// Functions
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);
  taskInput.value = ""; // Clear input

  saveTasks();
}

function handleTaskAction(e) {
  if (e.target.classList.contains("complete-btn")) {
    e.target.closest(".task-item").classList.toggle("completed");
    saveTasks();
  } else if (e.target.classList.contains("delete-btn")) {
    e.target.closest(".task-item").remove();
    saveTasks();
  }
}

function createTaskElement(taskText, completed = false) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  if (completed) taskItem.classList.add("completed");

  taskItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div class="task-buttons">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  return taskItem;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach(taskItem => {
    tasks.push({
      text: taskItem.querySelector(".task-text").textContent,
      completed: taskItem.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskItem = createTaskElement(task.text, task.completed);
    taskList.appendChild(taskItem);
  });
}