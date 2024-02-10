function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
    return date.toISOString().slice(0, 10);
}

export {
    capitalize,
    formatDate,
};