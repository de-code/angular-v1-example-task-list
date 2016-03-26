import navigator from "./navigator.js";

import taskListPageObjectFactory from "./task-list.page-object.js";

describe('Task List', () => {
  const SOME_ASSIGNEE = "Everyone";
  const SOME_TASK = "Write protractor tests";

  let taskList;
  let originalTaskListLength;

  beforeAll(() => {
    navigator.get();
    taskList = taskListPageObjectFactory(element(by.css('task-list')));
    taskList.items().then((items) => originalTaskListLength = items.length);
  });

  it('should display some task items', () => {
    expect(originalTaskListLength).not.toBe(0);
  });

  describe("adding a new item", () => {
    let lastItem;

    beforeAll(() => {
      taskList.itemAdd().enterAssigneeAndTask(SOME_ASSIGNEE, SOME_TASK);
      taskList.items().then((list) => lastItem = list[list.length - 1]);
    });

    it('should increase the number of items', () => {
      expect(taskList.items().then((list) => list.length)).toBe(originalTaskListLength + 1);
    });

    it('should add new item with correct assignee to task items', () => {
      expect(lastItem.assignee()).toBe(SOME_ASSIGNEE);
    });

    it('should add new item with correct task to task items', () => {
      expect(lastItem.task()).toBe(SOME_TASK);
    });

    describe("and deleting newly added item", () => {
      beforeAll(() => {
        lastItem.clickDelete();
      });

      it('should descrease the number of items to the original length', () => {
        expect(taskList.items().then((list) => list.length)).toBe(originalTaskListLength);
      });
    });
  });
});