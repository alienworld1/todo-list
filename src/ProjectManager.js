import Project from "./project";

const projectArray = [];
let activeProject;

export default class ProjectManager {
    static addNewProject(projectName) {
        const project = new Project(projectName);
        projectArray.push(project);
    }

     static get projectList() {
        return projectArray;
     }

     static set activeProject(projectArrayIndex) {
        activeProject = projectArray[projectArrayIndex];
     }

     static get activeProject() {
        return activeProject;
     }
}