const inputBox=document.getElementById('inputBox');
const addBtn=document.getElementById('addBtn');
const todoList=document.getElementById('todoList');

let editTodo=null;

//Function to add to do
const addTodo=()=>{
    // alert("HELLO!");
    const inputText=inputBox.value.trim();
    if(inputText.length<=0){
        alert("Please enter something!");
        return false;
    }

    if(addBtn.value === "Edit"){
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);

        editTodo.target.previousElementSibling.innerHTML=inputText;
        //editLocalTodos(inputText);
        addBtn.value="ADD";
        inputBox.value="";
    }

    else{
    //Creating P tag
    const li=document.createElement("li");
    const p=document.createElement("p");
    p.innerHTML=inputText;
    li.appendChild(p);

    
    //Inserting edit button in the li element
    const editBtn=document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.classList.add("btn","editBtn");
    li.appendChild(editBtn);


    // Inserting delete button in the li element
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="Remove";
    deleteBtn.classList.add("btn","deleteBtn");
    li.appendChild(deleteBtn);


    todoList.appendChild(li);
    inputBox.value="";

    saveLocalTodos(inputText);
    }
}

//Function to update:(1.Edit and 2.Remove) to do
const updateTodo=(e)=>{
    //console.log(e.target.innerHTML);
    if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if(e.target.innerHTML === "Edit"){
        inputBox.value=e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value="Edit";
        editTodo=e;
    }
}

//Function to save Local to do
const saveLocalTodos=(todo)=>{
        let todos;
        if(localStorage.getItem("todos") === null){
            todos=[];
        }
        else{
        todos=JSON.parse(localStorage.getItem("todos"));
        }

        todos.push(todo);
        localStorage.setItem("todos",JSON.stringify(todos));
        //console.log(todos)

}

//Function to get local to do
const getLocalTodos=()=>{
    let todos;
        if(localStorage.getItem("todos") === null){
            todos=[];
        }
        else{
        todos=JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo =>{
    //Creating P tag
    const li=document.createElement("li");
    const p=document.createElement("p");
    p.innerHTML=todo;
    li.appendChild(p);

    
    //Inserting edit button in the li element
    const editBtn=document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.classList.add("btn","editBtn");
    li.appendChild(editBtn);


    // Inserting delete button in the li element
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="Remove";
    deleteBtn.classList.add("btn","deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);  

        });
        }
}

//Function to delete local to do
const deleteLocalTodos=(todo)=>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
    todos=JSON.parse(localStorage.getItem("todos"));
    }

    let todoText=todo.children[0].innerHTML;
    let todoIndex=todos.indexOf(todoText);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    console.log(todoIndex);

}

const  editLocalTodos=(todo)=>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let todoIndex=todos.indexOf(todo);
    todos[todoIndex]=inputBox.value;
    localStorage.setItem("todos",JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded',getLocalTodos);
addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo);
