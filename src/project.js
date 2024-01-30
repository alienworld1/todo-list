class Project {
    constructor (name) {
        this.name = name;
        this.todo_container = {};
    }

    addTodo(todoID, todo) {
        this.todo_container[todoID] = todo;
    }

    removeTodo(todoID) {
        delete this.todo_container[todoID];
    }
}

export default Project;