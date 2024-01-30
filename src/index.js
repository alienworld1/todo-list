import DOMElements from "./DOMElements";
import ProjectManager from "./ProjectManager";
import todo from "./todo";

ProjectManager.addNewProject("Default Project");
ProjectManager.activeProject = 0;

DOMElements.initialize();
DOMElements.updateSidebar(ProjectManager.projectList);

const active = ProjectManager.activeProject;

const todo1 = todo(
    "Todo1",
    "This is a new todo with some stuff to do",
    new Date(2024, 3, 7),
    "high"
);

const todo2 = todo(
    "Todo2",
    "Here is another todo with even more stuff to do!",
    new Date(2024, 1, 28),
    "low"
);

active.addTodo("todo1", todo1);
active.addTodo("todo2", todo2);
console.log(ProjectManager.activeProject);

DOMElements.update();