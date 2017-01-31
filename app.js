const todo = document.querySelector("#todo");

function itemTemplate(item){
    return `<li><input type="checkbox" ${item.checked ? "checked" : ""} /> ${item.description}</li>`;
}

function displayTodos() {
    cozysdk.queryView("tododemo", "all")
    .then(list => {
        todo.innerHTML = list.map(item => {
            return itemTemplate(item.value);
        }).join("");
    });
}

displayTodos();

window.displayTodos = displayTodos;
