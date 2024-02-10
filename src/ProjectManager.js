import Project from "./project";
import StorageHandler  from "./StorageHandler";

let projectArray = [];
let activeProject;
let activeIndex = 0;

export default class ProjectManager {

    static initialize() {
      if (!StorageHandler.checkIfProjectArrayExists()) {
         ProjectManager.addNewProject("Default Project");
         ProjectManager.activeProject = 0;
     }
     
     else {
         const array = StorageHandler.projectArray;
         projectArray = array;
         ProjectManager.activeProject = 0;
     }
     
    }

    static addNewProject(projectName) {
        const project = new Project(projectName);
        projectArray.push(project);
    }

     static get projectList() {
        return projectArray;
     }

     static set activeProject(projectArrayIndex) {
        activeProject = projectArray[projectArrayIndex];
        activeIndex = projectArrayIndex;
     }

     static get activeProject() {
        return activeProject;
     }

     static get activeIndex() {
         return activeIndex;
     }

     static removeProject(projectIndex) {
         projectArray.splice(projectIndex, 1);
     }
}