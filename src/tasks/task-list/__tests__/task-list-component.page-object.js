import utils from "../../../__tests__/page-object-utils.js";

import taskListItemPageObjectFactory from "./task-list-item-component.page-object.js";
import taskListItemAddPageObjectFactory from "./task-list-item-add-component.page-object.js";

export default (root) => {
  const rootElement = utils.domElement(root);
  const undoElement = () => rootElement.querySelector('.undo');
  const redoElement = () => rootElement.querySelector('.redo');
  return {
    root: rootElement,
    clickUndo: () => undoElement().click(),
    isUndoEnabled: () => !undoElement().disabled,
    clickRedo: () => redoElement().click(),
    isRedoEnabled: () => !redoElement().disabled,
    items: () => utils.toArray(rootElement.querySelectorAll('task-list-item')).map((e) => taskListItemPageObjectFactory(e)),
    itemAdd: () => taskListItemAddPageObjectFactory(rootElement.querySelector('task-list-item-add'))
  };
};