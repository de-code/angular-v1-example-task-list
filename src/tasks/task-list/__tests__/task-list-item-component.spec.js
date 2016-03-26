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

  let $scope;
  let taskListItem;

  beforeEach(() => {
    var testModule = angular.module("tasks.test", [taskListModule.name]);
    angular.mock.module(testModule.name);

    inject(($rootScope, $compile) => {
      $scope = $rootScope.$new();
      $scope.task = angular.copy(SOME_ITEM);
      $scope.onDelete = jasmine.createSpy("onDelete");
      taskListItem = taskListItemPageObjectFactory(utils.compile(
        `<task-list-item item="task" on-delete="onDelete(item)"></task-list-item>`, $scope));
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

  describe("Clicking delete button", () => {
    beforeEach(() => {
      taskListItem.clickDelete();
    });

    it("should call on-delete handler", () => {
      expect($scope.onDelete).toHaveBeenCalledWith(SOME_ITEM);
    });
  });
});