// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.querySelector(".task-list");

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskAction);

// Functions
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  taskItem.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div class="task-buttons">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;
  taskList.appendChild(taskItem);
  taskInput.value = ""; // Clear input
}

function handleTaskAction(e) {
  if (e.target.classList.contains("complete-btn")) {
    e.target.closest(".task-item").classList.toggle("completed");
  } else if (e.target.classList.contains("delete-btn")) {
    e.target.closest(".task-item").remove();
  }
}
