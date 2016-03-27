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
  let localStorage;

  beforeEach(() => {
    localStorage = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);

    var testModule = angular.module("tasks.test", [taskServiceModule.name])
      .value('localStorage', localStorage);

    angular.mock.module(testModule.name);

    inject((_tasksExampleData_) => {
      tasksExampleData = _tasksExampleData_;
    });
  });

  describe("history", () => {
    beforeEach(() => {
      inject((_taskService_) => {
        taskService = _taskService_;
      });
    });

    it("should return list history", () => {
      expect(taskService.history()).toBeDefined();
    });
  });

  describe("with no previously saved items", () => {
    beforeEach(() => {
      localStorage.getItem.and.returnValue(null);
      inject((_taskService_) => {
        taskService = _taskService_;
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

      it("should save to local storage", () => {
        const expected = taskService.list().toArray().concat([SOME_ITEM]);
        taskService.add(SOME_ITEM);
        expect(localStorage.setItem).toHaveBeenCalledWith('taskList', JSON.stringify(expected));
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

      it("should save to local storage", () => {
        const expected = angular.copy(taskService.list().toArray());
        taskService.add(SOME_ITEM);
        localStorage.setItem.calls.reset();
        taskService.remove(SOME_ITEM);
        expect(localStorage.setItem).toHaveBeenCalledWith('taskList', JSON.stringify(expected));
      });
    });
  });

  describe("with previously saved items", () => {
    const SAVED_DATA = [SOME_ITEM];

    beforeEach(() => {
      localStorage.getItem.and.returnValue(JSON.stringify(SAVED_DATA));
      inject((_taskService_) => {
        taskService = _taskService_;
      });
    });

    describe("list", () => {
      it("should return previously saved data", () => {
        expect(taskService.list().toArray()).toEqual(SAVED_DATA);
      });
    });
  });

  describe("with previously saved empty list", () => {
    const SAVED_DATA = [];

    beforeEach(() => {
      localStorage.getItem.and.returnValue(JSON.stringify(SAVED_DATA));
      inject((_taskService_) => {
        taskService = _taskService_;
      });
    });

    describe("list", () => {
      it("should return previously saved data", () => {
        expect(taskService.list().toArray()).toEqual(SAVED_DATA);
      });
    });
  });

  describe("with previously saved corrupted JSON", () => {
    const SAVED_DATA = [];

    beforeEach(() => {
      localStorage.getItem.and.returnValue("invalid");
      inject((_taskService_) => {
        taskService = _taskService_;
      });
    });

    describe("list", () => {
      it("should return example data by default", () => {
        expect(taskService.list().toArray()).toEqual(tasksExampleData);
      });
    });
  });
});
