const todo = document.querySelector("#todo");

function displayTodos() {
    cozysdk.queryView("tododemo", "all")
    .then(list => {
        todo.innerHTML = list.map(item => {
            return `<li>${item.value.description}</li>`;
        }).join("");
    });
}

displayTodos();

window.displayTodos = displayTodos;
