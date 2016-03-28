import ListHistory from "./list-history.js";

export default class {
  static get $inject() {
    return ["localStorage", "tasksExampleData"];
  }

  constructor(localStorage, tasksExampleData) {
    const parseJsonOrNull = (json) => {
      try {
        return angular.fromJson(savedData);
      } catch (e) {
        return null;
      }
    }
    const storageKey = 'taskList';
    const savedData = localStorage.getItem(storageKey);
    const parsedData = savedData ? parseJsonOrNull(savedData) : tasksExampleData;
    const initialData = parsedData || tasksExampleData;
    this.listHistory = new ListHistory(initialData, {
      onChange: () => {
        localStorage.setItem(storageKey, angular.toJson(this.list().toArray()))
      }
    });
  }

  history() {
    return this.listHistory;
  }

  list() {
    return this.listHistory.list();
  }

  add(item) {
    this.listHistory.push(item);
  }

  updateAt(index, item) {
    this.listHistory.updateAt(index, item);
  }

  remove(item) {
    this.listHistory.filter(t => !angular.equals(t, item));
  }
}
