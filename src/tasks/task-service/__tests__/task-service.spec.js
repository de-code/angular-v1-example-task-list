import angular from "angular";
import "angular-mocks";

import taskServiceModule from "../index.js";

describe("TaskService", () => {
  const SOME_ITEM = {
    assignee: "someone",
    task: "do something"
  };

  let taskService;
  let tasksExampleData;

  beforeEach(() => {
    var testModule = angular.module("tasks.test", [taskServiceModule.name]);
    angular.mock.module(testModule.name);

    inject((_taskService_, _tasksExampleData_) => {
      taskService = _taskService_;
      tasksExampleData = _tasksExampleData_;
    });
  });

  describe("history", () => {
    it("should return list history", () => {
      expect(taskService.history()).toBeDefined();
    });
  });

  describe("list", () => {
    it("should return example data by default", () => {
      expect(taskService.list().toArray()).toEqual(tasksExampleData);
    });
  });

  describe("add", () => {
    it("should add item to list", () => {
      const expected = taskService.list().toArray().concat([SOME_ITEM]);
      taskService.add(SOME_ITEM);
      expect(taskService.list().toArray()).toEqual(expected);
    });
  });

  describe("remove", () => {
    it("should remove item from list", () => {
      const expected = angular.copy(taskService.list().toArray());
      taskService.add(SOME_ITEM);
      taskService.remove(SOME_ITEM);
      expect(taskService.list().toArray()).toEqual(expected);
    });

    it("should remove copy of item from list", () => {
      const expected = angular.copy(taskService.list().toArray());
      taskService.add(angular.copy(SOME_ITEM));
      taskService.remove(SOME_ITEM);
      expect(taskService.list().toArray()).toEqual(expected);
    });
  });
});