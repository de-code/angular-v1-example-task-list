import utils from "../../../__tests__/page-object-utils.js";

export default (root) => {
  const rootElement = utils.domElement(root);
  const assigneeElement = () => rootElement.querySelector('.assignee');
  const taskElement = () => rootElement.querySelector('.task');
  const deleteButtonElement = () => rootElement.querySelector('.delete');
  return {
    root: rootElement,
    assignee: () => utils.textContentOrNull(assigneeElement()),
    task: () => utils.textContentOrNull(taskElement()),
    clickDelete: () => deleteButtonElement().click()
  };
};