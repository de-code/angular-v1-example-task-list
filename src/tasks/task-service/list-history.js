import Immutable from "immutable";
import History from "undo-stack";

export default class {
  constructor(initialList, options) {
    this.options = options;
    this.currentList = Immutable.List(initialList);
    this.history = new History({
      // logger: console.log.bind(console),
      limit: 100
    });
  }

  list() {
    return this.currentList;
  }

  _fireOnChange() {
    if ((this.options) && (this.options.onChange)) {
      this.options.onChange();
    }
  }

  do(op, name) {
    const previousList = this.currentList;
    const newList = op(previousList);
    this.history.do({
      name: name,
      redo: () => this.currentList = newList,
      undo: () => this.currentList = previousList
    });
    this._fireOnChange();
  }

  push(item) {
    this.do(list => list.push(item), "add item");
  }

  updateAt(index, item) {
    this.do(list => list.update(index, () => item), "update item");
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
    this._fireOnChange();
  }

  redo() {
    this.history.redo();
    this._fireOnChange();
  }
}
