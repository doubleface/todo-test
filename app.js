const todo = document.querySelector("#todo");

let plist = cozysdk.queryView("tasky", "all");

function createTodos() {
    var p = Promise.resolve();
    for (let i = 0; i< 10; i++) {
        p.then(() => {
            return cozysdk.create("tasky", {description: `new task ${i}`});
        });
    }

    p.then(displayTodos);
}
function displayTodos(list) {
    todo.innerHTML = list.map(item => {
        return `<li>${item.value.description}</li>`;
    }).join("\n");
}

plist.then(displayTodos);

window.createTodos = createTodos;
