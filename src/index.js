import DOMElements from "./DOMElements";
import Project from "./project";
import todo from "./todo";

const DOMManager = new DOMElements();

DOMManager.initialize();

const defaultProject = new Project("Default Project");
const Project1 = new Project("Project1");

DOMManager.updateSidebar([defaultProject, Project1,]);