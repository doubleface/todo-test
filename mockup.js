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
    return getBills().then(list => {
        let pdfurl = null;
        for (let i=0;i<list.length;i++) {
            if (list[i].value.pdfurl) {
                pdfurl = list[i].value.pdfurl;
                break;
            }
        }
        return window.cozysdk.create("tododemo", {
            description: `Check your new uber bill`,
            link: pdfurl
        }).then(window.displayTodos);
    });
}

function getBills() {
    return window.cozysdk.queryView("bill", "all");
}

btncreate.addEventListener("click", () => {
    createTodos();
});
btncreate_special.addEventListener("click", () => {
    createTodoWithLink();
});
