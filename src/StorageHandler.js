

export default class StorageHandler {
    static checkIfProjectArrayExists() {
        if (localStorage.getItem("projectArray")) {
            return true;
        }

        return false;
    }
} 