import angular from "angular";
import "angular-mocks";

import taskListModule from "../index.js";

import utils from "../../../__tests__/spec-utils.js";

import taskListItemPageObjectFactory from "./task-list-item-component.page-object.js";

describe("TaskListItem component", () => {
  const SOME_ITEM = {
    assignee: "someone",
    task: "do something"
  };
  const OTHER_ITEM = {
    assignee: "other",
    task: "do nothing"
  };

  let $scope;
  let taskListItem;

  beforeEach(() => {
    var testModule = angular.module("tasks.test", [taskListModule.name]);
    angular.mock.module(testModule.name);

    inject(($rootScope, $compile) => {
      $scope = $rootScope.$new();
      $scope.task = angular.copy(SOME_ITEM);
      $scope.onDelete = jasmine.createSpy("onDelete");
      $scope.onChange = jasmine.createSpy("onChange");
      taskListItem = taskListItemPageObjectFactory(utils.compile(
        `<task-list-item item="task" on-delete="onDelete(item)" on-change="onChange(item)"></task-list-item>`, $scope));
    });
  });

  afterEach(() => {
    $scope.$destroy();
  });

  it("should display task's assignee", () => {
    expect(taskListItem.assignee()).toBe(SOME_ITEM.assignee);
  });

  it("should display task's task", () => {
    expect(taskListItem.task()).toBe(SOME_ITEM.task);
  });

  it("should display view mode element", () => {
    expect(taskListItem.isViewModeElementPresent()).toBe(true);
  });

  it("should not display input", () => {
    expect(taskListItem.input().isPresent()).toBe(false);
  });

  describe("Clicking delete button", () => {
    beforeEach(() => {
      taskListItem.clickDelete();
    });

    it("should call on-delete handler", () => {
      expect($scope.onDelete).toHaveBeenCalledWith(SOME_ITEM);
    });
  });

  describe("Clicking view mode element", () => {
    beforeEach(() => {
      taskListItem.clickViewModeElement();
    });

    it("should not display view mode element", () => {
      expect(taskListItem.isViewModeElementPresent()).toBe(false);
    });

    it("should display input", () => {
      expect(taskListItem.input().isPresent()).toBe(true);
    });

    it("should populate input with value", () => {
      expect(taskListItem.input().value()).toBe(SOME_ITEM.assignee + ': ' + SOME_ITEM.task);
    });

    describe("and entering an assignee with a task", () => {
      beforeEach(() => {
        taskListItem.input().enterAndBlur(OTHER_ITEM.assignee + ": " + OTHER_ITEM.task);
      });

      it("should call on-change handler", () => {
        expect($scope.onChange).toHaveBeenCalledWith(OTHER_ITEM);
      });

      it("should display view mode element", () => {
        expect(taskListItem.isViewModeElementPresent()).toBe(true);
      });

      it("should not display input", () => {
        expect(taskListItem.input().isPresent()).toBe(false);
      });
    });

    describe("and blur without changing any input", () => {
      beforeEach(() => {
        taskListItem.input().blur();
      });

      it("should not call on-change handler", () => {
        expect($scope.onChange).not.toHaveBeenCalled();
      });

      it("should display view mode element", () => {
        expect(taskListItem.isViewModeElementPresent()).toBe(true);
      });

      it("should not display input", () => {
        expect(taskListItem.input().isPresent()).toBe(false);
      });
    });
  });
});