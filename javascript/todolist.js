{
    const tasks = [
        {
            content: "przykładowe zadanie",
            done: false,
        },
    ]

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        })

        render();

        document.querySelector(".js-newTask").focus();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done")

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li
                class="list__item${task.done ? " list__item--done" : ""}">

                <div class="button__task"><button class="button js-done">${task.done ? "✔️" : ""}</button></div>
                <div class="task__content">${task.content}</div>
                <div class="button__task"><button class="button js-remove button__task--remove">🗑️</button></div>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        document.querySelector(".js-stats").innerText = `
        Do zrobienia: ${tasks.length}\n
        Ukończono: ${tasks.filter(task => task.done).length}
        `;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        document.querySelector(".js-newTask").value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}