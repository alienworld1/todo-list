import DOMElements from "./DOMElements";
import ProjectManager from "./ProjectManager";

DOMElements.initialize();

ProjectManager.addNewProject("Default Project");
DOMElements.updateSidebar(ProjectManager.projectList);
