const btncreate = document.querySelector("#create");
const btncreate_special = document.querySelector("#create_special");

function createTodos() {
    var p = Promise.resolve();
    for (let i = 0; i< 10; i++) {
        p.then(() => {
            return window.cozysdk.create("tododemo", {description: `new task ${i}`});
        });
    }

    p.then(window.displayTodos);
}

function createTodoWithLink() {
    return getBill().then(item => {
        if (item === undefined) {
            return window.alert("no document found");
        } else {
            let url = `/apps/files/files/${item.value._id}/attach/${item.value.name}`;
            return window.cozysdk.create("tododemo", {
                description: `Check your new <a href="${url}" target="_blank">bill </a>`,
            }).then(window.displayTodos);
        }
    });
}

function getBill() {
    return window.cozysdk.queryView("file", "all")
    .then(list => {
        return list.find(item => item.value.class === "document");
    });
}

btncreate.addEventListener("click", () => {
    createTodos();
});
btncreate_special.addEventListener("click", () => {
    createTodoWithLink();
});
