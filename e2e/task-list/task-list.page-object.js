import taskListItemPageObjectFactory from "./task-list-item-component.page-object.js";
import taskListItemAddPageObjectFactory from "./task-list-item-add-component.page-object.js";

export default (root) => {
  return {
    root: root,
    items: () => element.all(by.css('task-list-item')).then((elements) => elements.map((e) => taskListItemPageObjectFactory(e))),
    itemAdd: () => taskListItemAddPageObjectFactory(root.element(by.css('task-list-item-add')))
  };
};