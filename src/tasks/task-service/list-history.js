import Immutable from "immutable";
import History from "undo-stack";

export default class {
  constructor(initialList) {
    this.currentList = Immutable.List(initialList);
    this.history = new History({
      logger: console.log.bind(console),
      limit: 100
    });
  }

  list() {
    return this.currentList;
  }

  do(op, name) {
    const previousList = this.currentList;
    const newList = op(previousList);
    this.history.do({
      name: name,
      redo: () => this.currentList = newList,
      undo: () => this.currentList = previousList
    });
  }

  push(item) {
    this.do(list => list.push(item), "add item");
  }

  filter(f) {
    this.do(list => list.filter(f), "filter");
  }

  hasUndo() {
    return this.history.hasUndo();
  }

  hasRedo() {
    return this.history.hasRedo();
  }

  undo() {
    this.history.undo();
  }

  redo() {
    this.history.redo();
  }
}
