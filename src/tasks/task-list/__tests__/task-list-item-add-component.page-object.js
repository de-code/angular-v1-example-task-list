import utils from "../../../__tests__/page-object-utils.js";

export default (root) => {
  const rootElement = utils.domElement(root);
  const inputElement = () => rootElement.querySelector('input');
  return {
    root: rootElement,
    isPresent: () => !!rootElement,
    value: () => inputElement().value,
    enterAndBlur: (value) => utils.enterAndBlur(inputElement(), value),
    enterAssigneeAndTask: (assignee, task) => utils.enterAndBlur(inputElement(), assignee + ': ' + task)
  };
};