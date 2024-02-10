function todo(title, description, dueDate, priority) {

    if (!(dueDate instanceof Date)) {
        dueDate = new Date(dueDate);
    }

    return {
        title,
        description,
        dueDate,
        priority,
    }
}

export default todo;