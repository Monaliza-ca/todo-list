// elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

// functions
// adicionar tarefa
const saveTodo = (text) => {

    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

// eventos
// adicionar tarefa

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = todoInput.value 

    if (inputValue) {
        saveTodo(inputValue)
    }
})

// removendo a tarefa
document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div"); //selecionando a div de elemento pai mais próxima //

    if (targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done") //como o elemento pai foi selecionado, td vez q for finalizado ele muda automaticamente, o toggle é para inverter a ação ao clicar novamente //
    }

    if (targetElement.classList.contains("remove-todo")) {
        parentElement.remove(); // aqui o elemento pai é removido
    }

    if (targetElement.classList.contains("edit-todo")) {
        console.log("editou");
    }
})