const todo = document.querySelector("#todo");
const btncreate_special = document.querySelector("#create_special");

window.cozy = new Cozy({})

function displayTodos() {
  cozy.defineIndex("tododemo", ["completed"])
  .then((index) => cozy.query(index, {
    selector: {"completed": false},
  }))
  .then(list => {
    todo.innerHTML = list.map(item => {
      return `<li class="list-group-item">${item.description}</li>`;
    }).join("");
  });
}

function createTodoFromLastBill() {
  cozy.defineIndex('file', ["class"])
  .then((index) => cozy.query(index, {
    selector: {"class": "document"},
    limit: 1,
  }))
  .then(list => list[0])
  .then(file => {
    if (file === undefined) {
        window.alert("no document found");
    } else {
        let url = `/apps/files/files/${file._id}/attach/${file.name}`;
        cozy.create("tododemo", {
            description: `Pay this <a href="${url}" target="_blank">bill </a>`,
        }).then(displayTodos);
    }
  })
  .then(displayTodos);
}

displayTodos();

btncreate_special.addEventListener("click", () => {
    createTodoFromLastBill();
});


window.displayTodos = displayTodos;
