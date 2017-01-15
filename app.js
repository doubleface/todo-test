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
    return getBills().then(list => {
        let pdfurl = null;
        for (let i=0;i>list.length;i++) {
            if (list[i].value.pdfurl) {
                pdfurl = list[i].value.pdfurl;
                break;
            }
        }
        return cozysdk.create("tododemo", {
            description: `Check your new uber bill`,
            link: pdfurl
        }).then(displayTodos);
    });
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

function getBills() {
    return cozysdk.queryView("bill", "all");
}

init();
