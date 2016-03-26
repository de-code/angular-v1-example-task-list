import utils from "../../../__tests__/page-object-utils.js";

import taskListItemPageObjectFactory from "./task-list-item-component.page-object.js";
import taskListItemAddPageObjectFactory from "./task-list-item-add-component.page-object.js";

export default (root) => {
  const rootElement = utils.domElement(root);
  return {
    root: rootElement,
    items: () => utils.toArray(rootElement.querySelectorAll('task-list-item')).map((e) => taskListItemPageObjectFactory(e)),
    itemAdd: () => taskListItemAddPageObjectFactory(rootElement.querySelector('task-list-item-add'))
  };
};