import utils from "../protractor-utils.js";

export default (root) => {
  const inputElement = () => root.element(by.css('input'));
  return {
    root: root,
    enterAndBlur: (value) => utils.enterAndBlur(inputElement(), value),
    enterAssigneeAndTask: (assignee, task) => utils.enterAndBlur(inputElement(), assignee + ': ' + task)
  };
};