import printTodos from "./printTodos.js";
import { listDrop } from "./printLists.js";

let saveTodoName = document.getElementById("saveTodoName");
let saveTodoBtn = document.getElementById("saveTodoBtn");



export default saveTodoBtn.addEventListener("click", () => {
    console.log("click: ", saveTodoName.value, listDrop.value);

    fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({newTodoName: saveTodoName.value, newTodoList: listDrop.value})
    })
    .then(res => res.json())
    .then(data => {
        console.log("skapa item", data);
        printTodos(listDrop.value);
    })
})