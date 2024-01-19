import logoIcon from "./Images/notebook-check-outline.svg";

function loadImage(source, width, height) {
    const image = new Image();
    image.src = source;
    image.width = width;
    image.height = height;

    return image;
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

export default class DOMElements {
    constructor() {}

    get sidebar() {
        const thisSidebar = document.createElement("div");
        thisSidebar.classList.add("sidebar");

        const logoElement = logo("To-do List", logoIcon);

        thisSidebar.appendChild(logoElement);

        return thisSidebar;
    }

    initialize() {
        const body = document.querySelector("body");
        body.appendChild(this.sidebar);
    }
};