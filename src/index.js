import DOMElements from "./DOMElements";
import ProjectManager from "./ProjectManager";

DOMElements.initialize();

ProjectManager.addNewProject("Default Project");
ProjectManager.activeProject = 0;

DOMElements.updateSidebar(ProjectManager.projectList);
