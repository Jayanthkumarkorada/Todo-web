const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// Function to add a todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before editing it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.textContent);
        editTodo.target.previousElementSibling.textContent = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {
        // Creating li and p elements
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = inputText;  // Use textContent for safer text handling
        li.appendChild(p);

        // Creating Edit Btn
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Creating Delete Btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        // Appending li to todoList
        todoList.appendChild(li);
        inputBox.value = "";

        // Save todo in localStorage
        saveLocalTodos(inputText);
    }
}

// Function to update: (Edit/Delete) todo
const updateTodo = (e) => {
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.textContent;  // Use textContent for safer text handling
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

// Function to save local todo
const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todos and display them on page load
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // Clear the current list to avoid duplication when reloading
    todoList.innerHTML = "";

    // Rendering todos on the page
    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = todo;  // Use textContent for safer text handling
        li.appendChild(p);

        // Creating Edit Btn
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Creating Delete Btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

// Function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].textContent;  // Use textContent for safer text handling
    let todoIndex = todos.indexOf(todoText);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to update local todo
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Event listeners
document.addEventListener('DOMContentLoaded', getLocalTodos);  // Ensure todos are loaded on page load
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
