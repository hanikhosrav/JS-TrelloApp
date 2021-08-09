let add = document.getElementById("addTasks");
add.addEventListener("click", function(event) {
  event.preventDefault();
});

function addTask() {
  let title = document.getElementById("title").value;
  document.getElementById("title").value = "";

  if (title == "") {
    showMassage("error", "block");
    return;
  } else {
    showMassage("error", "none");
  }

  let newTask = {
    title: title,
    isDone: false
  };

  let tasks = localStorage.getItem("tasks");

  if (tasks != null) {
    tasks = JSON.parse(tasks);
    tasks.push(newTask);
  } else {
    tasks = [newTask];
  }

  tasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasks);

  createTask();
}

function createTask() {
  let tasks = localStorage.getItem("tasks");
  tasks = JSON.parse(tasks);

  let container = document.getElementById("container");
  container.innerHTML = "";

  for (let i in tasks) {
    let newTask = document.createElement("tr");
    let num = document.createElement("td");
    let task = document.createElement("td");
    let isDone = document.createElement("td");
    let trash = document.createElement("td");
    newTask.className = "myTask";
    newTask.appendChild(num);
    newTask.appendChild(task);
    newTask.appendChild(isDone);
    newTask.appendChild(trash);
    container.appendChild(newTask);
    num.innerHTML = tasks.indexOf(tasks[i]) + 1;
    task.innerHTML = tasks[i].title;

    let checked = "";
    if (tasks[i].isDone == true) {
      checked = "checked";
    } else {
      checked = "";
    }

    isDone.innerHTML = `<input onchange="taskDone('${tasks.indexOf(tasks[i])}')" type='checkbox' ${checked}>`;
    trash.innerHTML = `<i onclick="deleteTask('${tasks.indexOf(tasks[i])}')" class='trash fas fa-trash-alt'></i>`;

  }
}

function clearTasks() {
  localStorage.clear();
  createTask();
}

function showMassage(id, display) {
  document.getElementById(id).style.display = display;
}


function deleteTask(index) {
  let task = localStorage.getItem("tasks");
  task = JSON.parse(task);
  for (let i in task) {
    if (task.indexOf(task[i]) == index) {
      task.splice(i, 1)
    }
  }
  task = JSON.stringify(task);
  task = localStorage.setItem("tasks", task);
  createTask();
}

function taskDone(index) {
  let task = localStorage.getItem("tasks");
  task = JSON.parse(task);
  for (let i in task) {
    if (task.indexOf(task[i]) == index) {
      task[i].isDone = !task[i].isDone;
    }
  }
  task = JSON.stringify(task);
  task = localStorage.setItem("tasks", task);
  createTask();
}

createTask();
