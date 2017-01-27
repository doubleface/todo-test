const todo = document.querySelector("#todo");

let plist = cozysdk.queryView("tasky", "all");

function displayTodo(list) {
    todo.innerHTML = list.map(item => {
        return `<li>${item.values.description}</li>`;
    }).join("\n");
}

plist.then(displayTodo);
