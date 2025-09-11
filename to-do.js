let inputs = document.querySelector("input");
let btn = document.querySelector("button");
let task = document.querySelector(".task-list");

let to_dos = [];

let storage = localStorage.getItem("task array");

if (storage != null) {
    let ogdata = JSON.parse(storage);
    to_dos = ogdata;
    maketodo();
}

btn.addEventListener("click", function() {
    let query = inputs.value;
    inputs.value = "";
    if (query.trim() === "") {
        alert("Please Enter A Task");
        throw new Error("No Task");
    }

    let taskobj = {
        id: Date.now(),
        text: query
    };

    to_dos.push(taskobj);
    localStorage.setItem("task array", JSON.stringify(to_dos));
    maketodo(); // refresh after adding
});

function maketodo() {
    task.innerHTML = "";
    for (let i = 0; i < to_dos.length; i++) {
        let { id, text } = to_dos[i];
        let element = document.createElement("div");
        element.innerHTML = `
            <span class="task" contenteditable="false">${text}</span>
            <button class='edit'>Edit</button>
            <span class="delete"> 🗑️ </span>
        `;

        let delbtn = element.querySelector('.delete');
        let editbtn = element.querySelector('.edit');
        let taskText = element.querySelector('.task');

        // Delete
        delbtn.addEventListener("click", function() {
            let newarr = to_dos.filter(function(taskobj) {
                return taskobj.id != id;
            });
            to_dos = newarr;
            localStorage.setItem("task array", JSON.stringify(to_dos));
            maketodo(); // refresh after delete
        });

        // Edit / Save
        editbtn.addEventListener("click", function() {
            if (editbtn.innerText === 'Edit') {
                taskText.setAttribute("contenteditable", "true");
                editbtn.textContent = "Save";
            } else {
                taskText.setAttribute("contenteditable", "false");
                let updated = taskText.innerText.trim();
                if (updated !== "") {
                    to_dos = to_dos.map(function(taskobj) {
                        if (taskobj.id === id) {
                            taskobj.text = updated;
                        }
                        return taskobj;
                    });
                    localStorage.setItem("task array", JSON.stringify(to_dos));
                }
                editbtn.innerText = 'Edit';
            }
        });

        element.classList.add("todo");
        task.appendChild(element);
    }
}
