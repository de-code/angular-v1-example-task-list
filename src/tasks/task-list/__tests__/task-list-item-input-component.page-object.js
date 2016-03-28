import utils from "../../../__tests__/page-object-utils.js";

export default (root) => {
  const rootElement = utils.domElement(root);
  const inputElement = () => rootElement.querySelector('input');
  return {
    root: rootElement,
    isPresent: () => !!rootElement,
    value: () => inputElement().value,
    enter: (value) => utils.enter(inputElement(), value),
    blur: (value) => utils.trigger(inputElement(), 'blur'),
    pressEnter: (value) => utils.pressEnter(inputElement()),
    pressEnterUsingKey: (value) => utils.triggerKeyEvent(inputElement(), 'keypress', { key: "Enter" }),
    pressEnterUsingKeyCode: (value) => utils.triggerKeyEvent(inputElement(), 'keypress', { keyCode: 13 }),
    pressEnterUsingWhich: (value) => utils.triggerKeyEvent(inputElement(), 'keypress', { which: 13 }),
    enterAndBlur: (value) => utils.enterAndBlur(inputElement(), value),
    enterAssigneeAndTask: (assignee, task) => utils.enterAndBlur(inputElement(), assignee + ': ' + task)
  };
};