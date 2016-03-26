export default (root) => {
  const assigneeElement = () => root.element(by.css('.assignee'));
  const taskElement = () => root.element(by.css('.task'));
  const deleteButtonElement = () => root.element(by.css('.delete'));
  return {
    root: root,
    assignee: () => assigneeElement().getText(),
    task: () => taskElement().getText(),
    clickDelete: () => deleteButtonElement().click()
  };
};