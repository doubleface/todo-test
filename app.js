const todo = document.querySelector("#todo");

function displayTodos() {
    window.cozysdk.queryView("tododemo", "all")
    /* Promise.resolve([
        {value: {description: "toto"}},
        {value: {description: "bonjour tout le monde"}},
        {value: {description: "Voir ce que ça donne avec bootstrap"}},
    ]) */
    .then(list => {
        todo.innerHTML = list.map(item => {
            return `<li class="list-group-item">${item.value.description}</li>`;
        }).join("");
    });
}

displayTodos();

window.displayTodos = displayTodos;
