let inputForm = document.getElementById("inputForm");

export let listDrop = document.createElement("select");
listDrop.id = "listIdSelect";

export function printLists() {
    fetch("http://localhost:3000/lists")
    .then(res => res.json())
    .then(data => {
        console.log("listor", data);

        data.map(lista => {

            let dropItem = document.createElement("option")
            dropItem.value = lista.listId;
            dropItem.innerText = lista.listName;

            listDrop.appendChild(dropItem);

        })
        inputForm.prepend(listDrop);
    })
}