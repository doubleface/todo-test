const btncreate = document.querySelector("#create");

function createTodos() {
    var p = Promise.resolve();
    for (let i = 0; i< 10; i++) {
        p.then(() => {
            return cozy.create("tododemo", {description: `new task ${i}`});
        });
    }

    p.then(window.displayTodos);
}
