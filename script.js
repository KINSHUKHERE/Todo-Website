const submitBtn = document.getElementById("submitBtn");
const addTask = document.getElementById("addTask");
const arrTask = JSON.parse(localStorage.getItem("Task")) || [];
arrTask.forEach((task) => {
  createTask(task);
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (addTask.value.trim() === "") {
    alert("Please enter a task");
    return;
  }
  const inputContent = addTask.value;
  arrTask.push(inputContent);
  localStorage.setItem("Task", JSON.stringify(arrTask));
  let newLi = document.createElement("li");
  newLi.innerHTML = `
    ${inputContent}
    <button class="completed">Completed</button>
    <button class="deleted">&times;</button>
  `;
  document.querySelector("ul").appendChild(newLi);

  let completedBtn = newLi.querySelector(".completed");
  let deletedBtn = newLi.querySelector(".deleted");

  completedBtn.addEventListener("click", (e) => {
    newLi.style.textDecoration = "line-through";
    newLi.style.background = "red";
  });
  deletedBtn.addEventListener("click", (e) => {
    newLi.remove();
    const updatedTasks = arrTask.filter((item) => item !== task);

    localStorage.setItem("Task", JSON.stringify(updatedTasks));
  });

  addTask.value = "";
});

function createTask(task) {
  let newLi = document.createElement("li");

  newLi.innerHTML = `
    ${task}
    <button class="completed">Completed</button>
    <button class="deleted">&times;</button>
  `;

  document.querySelector("ul").appendChild(newLi);

  let completedBtn = newLi.querySelector(".completed");
  let deletedBtn = newLi.querySelector(".deleted");

  completedBtn.addEventListener("click", () => {
    newLi.style.textDecoration = "line-through";
    newLi.style.background = "red";
  });

  deletedBtn.addEventListener("click", () => {
    newLi.remove();

    const updatedTasks = arrTask.filter((item) => item !== task);

    localStorage.setItem("Task", JSON.stringify(updatedTasks));
  });
}

const darkModeBtn = document.getElementById("darkMode");
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
