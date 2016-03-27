import angular from "angular";
import "angular-mocks";

import taskListModule from "../index.js";

import utils from "../../../__tests__/spec-utils.js";

import taskListItemAddPageObjectFactory from "./task-list-item-add-component.page-object.js";

describe("TaskListItemAdd component", () => {
  const SOME_ASSIGNEE = "Everyone";
  const SOME_TASK = "Write unit tests";

  let $scope;
  let taskListItemAdd;

  beforeEach(() => {
    var testModule = angular.module("tasks.test", [taskListModule.name]);
    angular.mock.module(testModule.name);

    inject(($rootScope, $compile) => {
      $scope = $rootScope.$new();
      $scope.onAdd = jasmine.createSpy("onAdd");
      taskListItemAdd = taskListItemAddPageObjectFactory(utils.compile(
        `<task-list-item-add on-add="onAdd(item)"></task-list-item-add>`, $scope));
    });
  });

  afterEach(() => {
    $scope.$destroy();
  });

  it("should have an empty value by default", () => {
    expect(taskListItemAdd.value()).toBe("");
  });

  describe("Entering an empty text", () => {
    beforeEach(() => {
      taskListItemAdd.enterAndBlur("");
    });

    it("should not call on-add handler", () => {
      expect($scope.onAdd).not.toHaveBeenCalled();
    });
  });

  describe("Entering an assignee only", () => {
    beforeEach(() => {
      taskListItemAdd.enterAndBlur(SOME_ASSIGNEE);
    });

    it("should not call on-add handler", () => {
      expect($scope.onAdd).not.toHaveBeenCalled();
    });

    it("should keep value in the input field", () => {
      expect(taskListItemAdd.value()).toBe(SOME_ASSIGNEE);
    });
  });

  describe("Entering an assignee with a task", () => {
    beforeEach(() => {
      taskListItemAdd.enter(SOME_ASSIGNEE + ": " + SOME_TASK);
    });

    describe("and blur", () => {
      beforeEach(() => {
        taskListItemAdd.blur();
      });

      it("should call on-add handler", () => {
        expect($scope.onAdd).toHaveBeenCalledWith({
          assignee: SOME_ASSIGNEE,
          task: SOME_TASK
        });
      });

      it("should clear input field", () => {
        expect(taskListItemAdd.value()).toBe("");
      });
    });

    describe("and press enter using key", () => {
      beforeEach(() => {
        taskListItemAdd.pressEnterUsingKey();
      });

      it("should call on-add handler", () => {
        expect($scope.onAdd).toHaveBeenCalledWith({
          assignee: SOME_ASSIGNEE,
          task: SOME_TASK
        });
      });

      it("should clear input field", () => {
        expect(taskListItemAdd.value()).toBe("");
      });
    });

    describe("and press enter using key code", () => {
      beforeEach(() => {
        taskListItemAdd.pressEnterUsingKeyCode();
      });

      it("should call on-add handler", () => {
        expect($scope.onAdd).toHaveBeenCalledWith({
          assignee: SOME_ASSIGNEE,
          task: SOME_TASK
        });
      });

      it("should clear input field", () => {
        expect(taskListItemAdd.value()).toBe("");
      });
    });

    describe("and press enter using which", () => {
      beforeEach(() => {
        taskListItemAdd.pressEnterUsingWhich();
      });

      it("should call on-add handler", () => {
        expect($scope.onAdd).toHaveBeenCalledWith({
          assignee: SOME_ASSIGNEE,
          task: SOME_TASK
        });
      });

      it("should clear input field", () => {
        expect(taskListItemAdd.value()).toBe("");
      });
    });
  });
});