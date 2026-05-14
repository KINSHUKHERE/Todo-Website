const submitBtn = document.getElementById("submitBtn");
const addTask = document.getElementById("addTask");
const darkModeBtn = document.getElementById("darkMode");

let arrTask = JSON.parse(localStorage.getItem("Task")) || [];

arrTask.forEach((taskObj) => {
  createTask(taskObj);
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (addTask.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  const inputContent = addTask.value;

  const taskObj = {
    id: Date.now(),
    text: inputContent,
  };

  arrTask.push(taskObj);

  localStorage.setItem("Task", JSON.stringify(arrTask));

  createTask(taskObj);

  addTask.value = "";
});

function createTask(task) {
  let newLi = document.createElement("li");

  newLi.innerHTML = `
    ${task.text}
    <button class="completed">Completed</button>
    <button class="deleted">&times;</button>
  `;

  document.querySelector(".addList").appendChild(newLi);

  let completedBtn = newLi.querySelector(".completed");
  let deletedBtn = newLi.querySelector(".deleted");

  completedBtn.addEventListener("click", () => {
    newLi.style.textDecoration = "line-through";
    newLi.style.background = "red";
  });

  deletedBtn.addEventListener("click", () => {
    newLi.remove();

    arrTask = arrTask.filter((item) => item.id !== task.id);

    localStorage.setItem("Task", JSON.stringify(arrTask));
  });
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkModeBtn.textContent = "Light Mode";
}

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    darkModeBtn.textContent = "Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    darkModeBtn.textContent = "Dark Mode";
  }
});
