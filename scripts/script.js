fetch("api.php?api-name=getTasks", {
    method: "GET",
})
    .then(async (response) => await response.json())
    .then((data) => {
        for (let i = 0; i < data.tasks.length; i++) {
            let task = document.createElement("div");
            task.className = "task-container";
            task.innerHTML = `<div class="task">${data.tasks[i]}</div>
		<button type="submit" name='delete' class="delete">Delete</button>`;
            task.addEventListener("click", editTask);
            document.querySelector(".tasks").append(task);
        }
    });

document.querySelector("#form-s").onsubmit = function (event) {
    event.preventDefault();

    if (document.querySelector(".input-field").value.length == 0) {
        alert("Please enter a task");
    } else {
        let task = document.createElement("div");
        task.className = "task-container";
        task.innerHTML = `<div class="task">${document.querySelector(".input-field").value}</div>
    <button data-id='' type="submit" name='delete' class="delete">Delete</button>`;
        task.addEventListener("click", editTask);
        document.querySelector(".tasks").append(task);

        const data = new FormData(this);

        fetch(this.action, {
            method: "post",
            body: data,
        }).then((response) => console.log(response));

        task.querySelector(".delete").onclick = function (event) {
            event.stopPropagation();
            task.remove();
            const data = new FormData();
            data.set("removeItem", "task");
            fetch("api.php?api-name=removeTask", {
                method: "post",
                body: data,
            }).then((response) => console.log(response));
        };
    }
};

function editTask() {
    let task = this.parentElement;

    let edit = document.createElement("input");
    edit.className = "edit-field";
    edit.value = task.querySelector(".task").innerText;
    task.querySelector(".task").innerText = "";
    task.append(edit);
    edit.focus();
    edit.onblur = function () {
        task.querySelector(".task").innerText = edit.value;
        edit.remove();
    };
}
