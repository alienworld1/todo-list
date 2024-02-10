import Project from "./project";

const projectArray = [];
let activeProject;
let activeIndex = 0;

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