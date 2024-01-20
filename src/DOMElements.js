import logoIcon from "./Images/notebook-check-outline.svg";

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

function createSidebar() {
    const thisSidebar = document.createElement("div");
    thisSidebar.classList.add("sidebar");

    const logoElement = logo("To-do List", logoIcon);

    thisSidebar.appendChild(logoElement);

    const newProjectButton = document.createElement("button");
    newProjectButton.textContent = "New Project";

    thisSidebar.appendChild(newProjectButton);

    const projectList = document.createElement("ul");
    projectList.classList.add("project-list");
    thisSidebar.appendChild(projectList);

    return thisSidebar;
}

export default class DOMElements {
    constructor() {}

    get sidebar() {
        const sidebarElement = document.querySelector(".sidebar");
        return sidebarElement;
    }

    updateSidebar(projectArray) {
        const sidebar = this.sidebar;

        const projectList = sidebar.querySelector("ul");
        projectArray.forEach(project => {
            const listElement = document.createElement("li");
            listElement.textContent = project.name;

            projectList.appendChild(listElement);
        });
    }

    initialize() {
        const body = document.querySelector("body");
        body.appendChild(createSidebar());
    }
};