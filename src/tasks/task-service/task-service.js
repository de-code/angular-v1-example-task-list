export default class {
  static get $inject() {
    return ["tasksExampleData"];
  }

  constructor(tasksExampleData) {
    this.data = angular.copy(tasksExampleData);
  }

  list() {
    return angular.copy(this.data);
  }

  add(item) {
    this.data.push(item);
  }

  remove(item) {
    this.data = this.data.filter((t) => !angular.equals(t, item));
  }
}
