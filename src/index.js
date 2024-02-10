import DOMElements from "./DOMElements";
import ProjectManager from "./ProjectManager";

ProjectManager.initialize();

DOMElements.initialize();
DOMElements.updateSidebar(ProjectManager.projectList);

DOMElements.update();