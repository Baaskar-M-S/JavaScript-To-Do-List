const form = document.getElementById('todo-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const todoList = document.getElementById('todo-list');
const clearAllButton = document.getElementById('clear-all');

// Retrieve existing tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Render tasks
const renderTasks = () => {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <div class="actions">
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
};

// Add a new task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  if (title && description) {
    tasks.push({ title, description });
    saveToLocalStorage();
    renderTasks();
    form.reset();
  }
});

// Edit a task
const editTask = (index) => {
  const task = tasks[index];
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  tasks.splice(index, 1); // Remove the task being edited
  saveToLocalStorage();
  renderTasks();
};

// Delete a single task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveToLocalStorage();
  renderTasks();
};

// Delete all tasks
clearAllButton.addEventListener('click', () => {
  tasks = [];
  saveToLocalStorage();
  renderTasks();
});

// Initial render
renderTasks();
