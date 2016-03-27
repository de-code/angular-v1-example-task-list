import ListHistory from "./list-history.js";

export default class {
  static get $inject() {
    return ["tasksExampleData"];
  }

  constructor(tasksExampleData) {
    this.listHistory = new ListHistory(tasksExampleData);
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

  remove(item) {
    this.listHistory.filter(t => !angular.equals(t, item));
  }
}
