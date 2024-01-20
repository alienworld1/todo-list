class Project {
    constructor (name) {
        this.name = name;
        this.todo_array = [];
    }

    addTodo(todoObject) {
        this.todo_array.push(todoObject);
    }

    removeTodo(index) {
        this.todo_array.splice(index, 1);
    }
}