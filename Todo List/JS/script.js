// elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// functions
// adicionar tarefa
const saveTodo = (text, done = 0, save = 1) => {

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

    // utilizando dados da ls
    if(done) {
        todo.classList.add("done")
    }

    if(save) {
        saveTodoLocalStorage({text, done})
    }


    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
}

// esconder um forms e mostrar outro
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            updateTodoLocalStorage(oldInputValue, text)
        }
    })
}

const getSearchTodos = (search) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        const normalizeSearch = search.toLowerCase()

        todo.style.display = "flex"

        if(!todoTitle.includes(normalizeSearch)) {
            todo.style.display = "none"
        }
    })
}

// filtro

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");
  
    switch (filterValue) {
      case "all":
        todos.forEach((todo) => (todo.style.display = "flex"));
        break;
  
        case "done":
        todos.forEach((todo) => 
        todo.classList.contains("done") 
            ? (todo.style.display = "flex") 
            : (todo.style.display ="none")
        );
        break;

        case "todo":
            todos.forEach((todo) =>
              !todo.classList.contains("done")
                ? (todo.style.display = "flex")
                : (todo.style.display = "none")
            );      
            break;
      
          default:
            break;
    }
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

// removendo e editando a tarefa
document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div"); //selecionando a div de elemento pai mais próxima //
    let todoTitle;

    if (parentElement && parentElement.querySelector("h3")) {
        todoTitle = parentElement.querySelector("h3").innerText; 
    }
    
    if (targetElement.classList.contains("finish-todo")) {
        parentElement.classList.toggle("done") //como o elemento pai foi selecionado, td vez q for finalizado ele muda automaticamente, o toggle é para inverter a ação ao clicar novamente //
    
        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetElement.classList.contains("remove-todo")) {
        parentElement.remove(); // aqui o elemento pai é removido

        removeTodoLocalStorage(todoTitle)
    }

    if (targetElement.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()

})

// busca
searchInput.addEventListener("keyup", (e) => {

    const search = e.target.value

    getSearchTodos(search);

})

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault()

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
})

// filtro
filterBtn.addEventListener("change", (e) => {

    const filterValue = e.target.value

    filterTodos(filterValue)
})

// local storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos
}

const loadTodos = () => {
    const todos = getTodosLocalStorage()

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0)
    })
}

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage()

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))
}

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage(); 

    const filteredTodos = todos.filter((todo) => todo.text !== todoText)

    localStorage.setItem("todos", JSON.stringify(filteredTodos))

}

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage(); 

   todos.map((todo) => 
    todo.text === todoText ? todo.done = !todo.done : null
);

    localStorage.setItem("todos", JSON.stringify(todos))

}

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage(); 

   todos.map((todo) => 
    todo.text === todoOldText ? (todo.done = todoNewText):null
);

    localStorage.setItem("todos", JSON.stringify(todos))

}

loadTodos();