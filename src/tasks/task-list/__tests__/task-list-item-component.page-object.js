import utils from "../../../__tests__/page-object-utils.js";

import taskListItemInputPageObjectFactory from "./task-list-item-input-component.page-object.js";

export default (root) => {
  const rootElement = utils.domElement(root);
  const assigneeElement = () => rootElement.querySelector('.assignee');
  const taskElement = () => rootElement.querySelector('.task');
  const deleteButtonElement = () => rootElement.querySelector('.delete');
  const viewModeElement = () => rootElement.querySelector('.view-mode');
  const inputElement = () => rootElement.querySelector('task-list-item-input');
  return {
    root: rootElement,

    assignee: () => utils.textContentOrNull(assigneeElement()),
    task: () => utils.textContentOrNull(taskElement()),

    clickDelete: () => deleteButtonElement().click(),

    isViewModeElementPresent: () => !!viewModeElement(),
    clickViewModeElement: () => viewModeElement().click(),

    input: () => taskListItemInputPageObjectFactory(inputElement())
  };
};