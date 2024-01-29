import ProjectManager from "./ProjectManager";
import logoIcon from "./Images/notebook-check-outline.svg";

const body = document.querySelector("body");

function loadImage(source, width, height) {
    const image = new Image();
    image.src = source;
    image.width = width;
    image.height = height;

    return image;
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

function formInputElement(labelText, inputDetails) {
    const section = document.createElement("section");
    const label = document.createElement("label");

    label.setAttribute("for", inputDetails.id);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = inputDetails.type ?? "text";
    input.id = inputDetails.id;
    input.name = inputDetails.name ?? inputDetails.id;

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

function createProjectDialog() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("project-dialog");

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
    }
};