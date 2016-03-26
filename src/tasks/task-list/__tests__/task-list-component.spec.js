import angular from "angular";
import "angular-mocks";

import taskListModule from "../index.js";

import utils from "../../../__tests__/spec-utils.js";

import taskListPageObjectFactory from "./task-list-component.page-object.js";

describe("TaskList component", () => {
  const SOME_ASSIGNEE = "Everyone";
  const SOME_TASK = "Write unit tests";
  const OTHER_ASSIGNEE = "Tests";
  const OTHER_TASK = "Don't break";

  let $scope;
  let list;
  let taskService;
  let taskList;

  const createTaskList = () => {
    return taskList = taskListPageObjectFactory(utils.compile(`<task-list></task-list>`, $scope));
  };

  beforeEach(() => {
    taskService = jasmine.createSpyObj('taskService', ['list', 'add', 'remove']);
    var testModule = angular.module("tasks.test", [taskListModule.name])
      .value('taskService', taskService);
    angular.mock.module(testModule.name);

    inject(($rootScope) => {
      $scope = $rootScope.$new();
    });

    taskService.list.and.callFake(() => angular.copy(list));
    taskService.add.and.callFake((item) => list.push(item));
    taskService.remove.and.callFake((item) => list = list.filter((current) => !angular.equals(current, item)));
  });

  afterEach(() => {
    $scope.$destroy();
  });

  describe("with an empty task list", () => {
    beforeEach(() => {
      list = [];
      createTaskList();
    });

    it("should not render any items", () => {
      expect(taskList.itemAdd().isPresent()).toBe(true);
    });

    it("should render item add row", () => {
      expect(taskList.itemAdd().isPresent()).toBe(true);
    });

    describe("and adding an item", () => {
      beforeEach(() => {
        taskList.itemAdd().enterAssigneeAndTask(SOME_ASSIGNEE, SOME_TASK);
      });

      it("should render one item", () => {
        expect(taskList.items().length).toBe(1);
      });

      it("should render item with correct assignee", () => {
        expect(taskList.items()[0].assignee()).toBe(SOME_ASSIGNEE);
      });

      it("should render item with correct task", () => {
        expect(taskList.items()[0].task()).toBe(SOME_TASK);
      });

      describe("and adding another item", () => {
        beforeEach(() => {
          taskList.itemAdd().enterAssigneeAndTask(OTHER_ASSIGNEE, OTHER_TASK);
        });

        it("should render two items", () => {
          expect(taskList.items().length).toBe(2);
        });

        describe("and deleting first item", () => {
          beforeEach(() => {
            taskList.items()[0].clickDelete();
          });

          it("should render one item", () => {
            expect(taskList.items().length).toBe(1);
          });
        });
      });
    });
  });

  describe("with two initial tasks", () => {
    beforeEach(() => {
      list = [{
        assignee: SOME_ASSIGNEE,
        task: SOME_TASK
      }, {
        assignee: OTHER_ASSIGNEE,
        task: OTHER_TASK
      }];
      createTaskList();
    });

    it("should render two items", () => {
      expect(taskList.items().length).toBe(2);
    });
  });
});