import Project from "./project";

function projectFromJSON(object) {
    const project = new Project(object.name);
    project.todo_container = object.todo_container;
    
    return project;
}

export default class StorageHandler {
    static checkIfProjectArrayExists() {
        if (localStorage.getItem("projectArray")) {
            return true;
        }

        return false;
    }

    static set projectArray(array) {
        localStorage.setItem("projectArray", JSON.stringify(array));
    }

    static get projectArray() {
        const array = JSON.parse(localStorage.getItem("projectArray"));
        const newArray = array.map(project => {
            for (const todo in project.todo_container) {
                project.todo_container[todo].dueDate = new Date(todo.dueDate);
            }
            return projectFromJSON(project);
        });
        return newArray;
    }
} 