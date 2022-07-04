{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.splice(0, taskIndex),
            ...tasks.splice(taskIndex + 1),
        ];

        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            tasks[taskIndex].done = !tasks[taskIndex].done
        ];

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

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item${task.done ? " list__item--done" : ""}">
            <div class="button__task"><button class="button js-done">${task.done ? "✔️" : ""}</button></div>
            <div class="task__content">${task.content}</div>
            <div class="button__task"><button class="button js-remove button__task--remove">🗑️</button></div>
            </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => { };

    const bindButtonsEvents = () => { };


    const render = () => {
        renderTasks();
        renderButtons();

        //document.querySelector(".js-stats").innerText = `
        //Do zrobienia: ${tasks.length}\n
        //Ukończono: ${tasks.filter(task => task.done).length}
        //`;

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}