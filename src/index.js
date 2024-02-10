import DOMElements from "./DOMElements";
import ProjectManager from "./ProjectManager";
import StorageHandler  from "./StorageHandler";

if (!StorageHandler.checkIfProjectArrayExists()) {
    ProjectManager.addNewProject("Default Project");
    ProjectManager.activeProject = 0;
}

DOMElements.initialize();
DOMElements.updateSidebar(ProjectManager.projectList);

DOMElements.update();