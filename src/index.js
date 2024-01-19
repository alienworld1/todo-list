import DOMElements from "./DOMElements";

const DOMManager = new DOMElements();

const body = document.querySelector("body");
body.appendChild(DOMManager.sidebar);