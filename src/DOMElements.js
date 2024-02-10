import ProjectManager from "./ProjectManager";
import logoIcon from "./Images/notebook-check-outline.svg";
import todo from "./todo";

const body = document.querySelector("body");

function loadImage(source, width, height) {
    const image = new Image();
    image.src = source;
    image.width = width;
    image.height = height;

    return image;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function editForm(todoCard) {
    const todo = ProjectManager.activeProject.todo_container[todoCard.id];
    
    const dialog = newTodoDialog();

    body.appendChild(dialog);
    dialog.showModal();

    document.getElementById("title").value = todo.title;
    document.getElementById("description").value = todo.description;

    // changing date to YYYY-MM-DD format.
    document.getElementById("due-date").value = todo.dueDate.toISOString().slice(0, 10);

    document.getElementById(todo.priority).checked = true;

}

function todoDOMElement(project, todoID) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    todoCard.id = todoID;

    const thisTodo = project.todo_container[todoID];

    const accent = document.createElement("div");
    accent.classList.add("accent");
    accent.classList.add(thisTodo.priority);
    accent.textContent = capitalize(thisTodo.priority);

    const todoHeader = document.createElement("h3");
    todoHeader.textContent = thisTodo.title;

    const todoDescription = document.createElement("p");
    todoDescription.classList.add("description");
    todoDescription.textContent = thisTodo.description;

    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("description");
    todoDueDate.textContent = `Due on ${thisTodo.dueDate.toDateString()}`;

    const buttonSection = document.createElement("section");
    buttonSection.classList.add("button-container");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("create-button");
    deleteButton.classList.add("red-background");
    deleteButton.textContent = "Delete";

    const editButton = document.createElement("button");
    editButton.classList.add("create-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", event => {
        const todo = event.currentTarget.parentNode.parentNode;
        editForm(todo);
    });

    buttonSection.appendChild(editButton);
    buttonSection.appendChild(deleteButton);

    todoCard.appendChild(accent);
    todoCard.appendChild(todoHeader);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(todoDueDate);
    todoCard.appendChild(buttonSection);
    
    return todoCard;
}

function removeAllChildElements(parentNode) {
    while (parentNode.firstChild) parentNode.removeChild(parentNode.firstChild);
}

function logo(name, icon) {
    const logoElement = document.createElement("div");
    logoElement.classList.add("logo");

    const logoIcon = loadImage(icon, 32, 32);

    const logoNameElement = document.createElement("span");
    logoNameElement.textContent = name;

    logoElement.appendChild(logoIcon);
    logoElement.appendChild(logoNameElement);

    return logoElement;
    
}

/**
 * Returns a object containing the section and the input element
 * @param {string} labelText 
 * @param {object} inputDetails - the id is required, but the type and name can also be mentioned 
 * @returns 
 */
function formInputElement(labelText, inputDetails) {
    const section = document.createElement("section");
    const label = document.createElement("label");

    label.setAttribute("for", inputDetails.id);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = inputDetails.type ?? "text";
    input.id = inputDetails.id;
    input.name = inputDetails.name ?? inputDetails.id;

    if (inputDetails.value) input.value = inputDetails.value; 

    section.appendChild(label);
    section.appendChild(input);

    return {
        section,
        input,
    };
}

function selectActiveProject(event) {
    const projectIndex = +event.currentTarget.id;
    ProjectManager.activeProject = projectIndex;

    displayActiveProject();
}

function createSidebar() {
    const thisSidebar = document.createElement("div");
    thisSidebar.classList.add("sidebar");

    const logoElement = logo("To-do List", logoIcon);

    thisSidebar.appendChild(logoElement);

    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "New Project";
    newProjectButton.classList.add("create-button");
    newProjectButton.addEventListener("click", () => {
        const dialog = createProjectDialog();
        body.appendChild(dialog);
        dialog.showModal();
    })

    thisSidebar.appendChild(newProjectButton);

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");
    thisSidebar.appendChild(projectList);

    return thisSidebar;
}

function newProject(projectName) {
    ProjectManager.addNewProject(projectName);
    DOMElements.updateSidebar(ProjectManager.projectList);
}

function prioritySection() {
    const prioritySection = document.createElement("section");
    prioritySection.classList.add("block");

    const priorityHeader = document.createElement("p");
    priorityHeader.textContent = "Priority:";

    prioritySection.appendChild(priorityHeader);

    const priorityRadioButtons = document.createElement("div");
    priorityRadioButtons.classList.add("priority-section");

    const highRadioInput = formInputElement("High", {
        id: "high",
        type: "radio",
        value: "high",
        name: "priority",
    });

    const mediumRadioInput = formInputElement("Medium", {
        id: "medium",
        type: "radio",
        value: "medium",
        name: "priority",
    });

    const lowRadioInput = formInputElement("Low", {
        id: "low",
        type: "radio",
        value: "low",
        name: "priority",
    });

    lowRadioInput.input.checked = true;

    priorityRadioButtons.appendChild(highRadioInput.section);
    priorityRadioButtons.appendChild(mediumRadioInput.section);
    priorityRadioButtons.appendChild(lowRadioInput.section);

    prioritySection.appendChild(priorityRadioButtons);
    return prioritySection;
}

function newTodoDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("form-dialog");

    const form = document.createElement("form");

    const newTodoTitleSection = formInputElement("Title: ", {
        id: "title",
    });
    
    const descriptionSection = document.createElement("section");
    descriptionSection.classList.add("block");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description:";
    
    const descriptionInput = document.createElement("textarea");
    descriptionInput.rows = 5;
    descriptionInput.cols = 55;
    descriptionInput.name = "description";
    descriptionInput.id = "description";

    descriptionSection.appendChild(descriptionLabel);
    descriptionSection.appendChild(descriptionInput);

    const dueDateSection = formInputElement("Due Date:", {
        id: "due-date",
        type: "date",
    });
    
    const createButton = document.createElement("button");
    createButton.textContent = "Enter Todo";
    createButton.classList.add("create-button");
    createButton.classList.add("todo-button");

    form.appendChild(newTodoTitleSection.section);
    form.appendChild(descriptionSection);
    form.appendChild(dueDateSection.section);
    form.appendChild(prioritySection());

    createButton.addEventListener("click", event => {
        event.preventDefault();

        const formData = new FormData(form);

        const title = formData.get("title");
        const description = formData.get("description");
        const dueDate = formData.get("due-date");
        const priority = formData.get("priority");

        if (!(title && description && dueDate)) {
            dialog.close();
            return;
        }

        let id;

        if (ProjectManager.activeProject.hasOwnProperty(title)) {
            id = title + "1";
        }

        else id = title;

        const newTodo = todo(
            title,
            description,
            new Date(dueDate),
            priority
        );

        ProjectManager.activeProject.addTodo(id, newTodo);
        DOMElements.update();
        dialog.close();

    });

    form.appendChild(createButton);

    dialog.appendChild(form);
    dialog.addEventListener("close", () => {
        body.removeChild(dialog);
    });

    return dialog;
}

function openTodoDialog() {
    const dialog = newTodoDialog();
    body.appendChild(dialog);
    dialog.showModal();
}

function createProjectDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("form-dialog");

    const newProjectInputSection = formInputElement("Name of the New Project:", {id: "new-project-name"});

    const createProjectButton = document.createElement("button");
    createProjectButton.textContent = "Create New Project";
    createProjectButton.classList.add("create-button");

    createProjectButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (!newProjectInputSection.input.value) {
            dialog.close();
            return;
        }

        newProject(newProjectInputSection.input.value);
        dialog.close();
    });

    dialog.appendChild(newProjectInputSection.section);
    dialog.appendChild(createProjectButton);

    dialog.addEventListener("close", () => {
        body.removeChild(dialog);
    });

    return dialog;
}

function projectTitle() {
    const projectHeader = document.createElement("h1");
    projectHeader.classList.add("project-header");

    return projectHeader;
}

function displayActiveProject() {
    const projectHeader = document.querySelector(".project-header");
    projectHeader.textContent = ProjectManager.activeProject.name;

    DOMElements.update();
}

function header() {
    const header = document.createElement("header");
    const projectHeader = projectTitle();
    header.classList.add("translucent-box");
    header.classList.add("center-in-main");

    const newToDoButton = document.createElement("button");
    newToDoButton.classList.add("create-button");
    newToDoButton.textContent = "Add a new entry"
    newToDoButton.addEventListener("click", openTodoDialog);

    header.appendChild(projectHeader);
    header.appendChild(newToDoButton);

    return header;
}

function checkEmptytodoContainer() {
    const todoContainer = document.querySelector("#todo-container");

    if (!todoContainer.firstChild) {
        todoContainer.textContent = "This project is empty at the moment.";
        todoContainer.classList.add("center-text");
    }

    else {
        todoContainer.classList.remove("center-text");
    }
}

function todoContainer() {
    const todoContainer = document.createElement("div");
    todoContainer.id = "todo-container";
    todoContainer.classList.add("translucent-box");
    todoContainer.classList.add("center-in-main");

    return todoContainer;
}

function updateToDoContainer(project) {
    const todoContainer = document.querySelector("#todo-container");
    removeAllChildElements(todoContainer);

    for (const todoID in project.todo_container) {
        const todoCard = todoDOMElement(project, todoID);
        todoContainer.appendChild(todoCard);
    }

    checkEmptytodoContainer();
}

function main() {
    const main = document.createElement("main");
    main.appendChild(header());
    main.appendChild(todoContainer());

    return main;
}

export default class DOMElements {
    constructor() {}

    static get sidebar() {
        const sidebarElement = document.querySelector(".sidebar");
        return sidebarElement;
    }

    static updateSidebar(projectArray) {
        const sidebar = DOMElements.sidebar;

        const projectList = sidebar.querySelector("ul");
        removeAllChildElements(projectList);
        let i = 0;
        projectArray.forEach(project => {
            const listElement = document.createElement("li");
            listElement.textContent = project.name;
            listElement.id = i;
            i++;

            listElement.addEventListener("click", selectActiveProject);

            projectList.appendChild(listElement);
        });
    }

    static initialize() {
        body.appendChild(createSidebar());
        body.appendChild(main());
        checkEmptytodoContainer();

        displayActiveProject();
    }

    static update() {
        updateToDoContainer(ProjectManager.activeProject);
    }
};