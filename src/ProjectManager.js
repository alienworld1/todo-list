import Project from "./project";

const projectArray = [];

export default class ProjectManager {
    static addNewProject(projectName) {
        const project = new Project(projectName);
        projectArray.push(project);
    }

     static get projectList() {
        return projectArray;
     }
}