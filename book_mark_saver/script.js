window.addEventListener('DOMContentLoaded',()=>{
    // No need to import lucide-react in vanilla JS
// const { Filter } = require("lucide-react");

let url_name = document.getElementById("url-name");
let link = document.getElementById("link");
let save = document.querySelector("#save");
let saveList = document.querySelector(".saveList");

// FIXED: Correct storage key name
let storage = JSON.parse(localStorage.getItem("bookmarks")) || [];

// Function to display each bookmark
function displayMark(obj) {
    let list = document.createElement("div");
    list.classList.add("list");

    let h3 = document.createElement("h3");
    h3.innerHTML = `<a href="${obj.url}" target="_blank">${obj.name}</a>`;

    let remove = document.createElement("button");
    remove.textContent = "❌";

    remove.addEventListener("click", () => {
        storage = storage.filter((mark) => mark.id !== obj.id);
        localStorage.setItem("bookmarks", JSON.stringify(storage));
        saveList.removeChild(list);
    });

    list.appendChild(h3);
    list.appendChild(remove);
    saveList.appendChild(list);
}
storage.forEach(item => displayMark(item));

// Save new bookmark
save.addEventListener("click", () => {
    if (url_name.value.trim() !== "" && link.value.trim() !== "") {

        let obj = {
            name: url_name.value,
            url: link.value,
            id: Date.now()
        };

        storage.push(obj);
        localStorage.setItem("bookmarks", JSON.stringify(storage));

        displayMark(obj);

        // Clear input fields
        url_name.value = "";
        link.value = "";
    }
    else {
        saveList.textContent = "Enter a valid bookmark";

        setTimeout(() => {
            saveList.textContent = "";
            saveList.innerHTML = "";
            storage.forEach(item => displayMark(item));
        }, 1000);
    }
});

});