const todo = document.querySelector("#todo");
const btncreate = document.querySelector("#create");
const btncreate_special = document.querySelector("#create_special");

function init() {
    btncreate.addEventListener("click", () => {
        createTodos();
    });
    btncreate_special.addEventListener("click", () => {
        createTodoWithLink();
    });
    displayTodos();
}

function createTodos() {
    var p = Promise.resolve();
    for (let i = 0; i< 10; i++) {
        p.then(() => {
            return cozysdk.create("tododemo", {description: `new task ${i}`});
        });
    }

    p.then(displayTodos);
}

function createTodoWithLink() {
    return cozysdk.create("tododemo", {
        description: `Check your new uber bill`,
        link: "https://mrthiriot.cozycloud.cc/apps/files/files/4a1beb57ee37b9a121ce94d7b1cb2484/attach/20150519_SFR.pdf"
    }).then(displayTodos);
}


function displayTodos() {
    cozysdk.queryView("tododemo", "all")
    .then(list => {
        todo.innerHTML = list.map(item => {
            let link = "";
            if (item.value.link) link = `&nbsp;<a href="${item.value.link}" target="_blank">link</a>`;
            return `<li>${item.value.description} ${link}</li>`;
        }).join("\n");
    });
}

init();
