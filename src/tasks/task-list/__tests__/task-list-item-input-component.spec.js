import angular from "angular";
import "angular-mocks";

import taskListModule from "../index.js";

import utils from "../../../__tests__/spec-utils.js";

import taskListItemInputPageObjectFactory from "./task-list-item-input-component.page-object.js";

describe("TaskListItemInput component", () => {
  const SOME_ASSIGNEE = "Everyone";
  const SOME_TASK = "Write unit tests";

  let $scope;
  let taskListItemInput;

  beforeEach(() => {
    var testModule = angular.module("tasks.test", [taskListModule.name]);
    angular.mock.module(testModule.name);

    inject(($rootScope) => {
      $scope = $rootScope.$new();
      $scope.onChange = jasmine.createSpy("onChange");
      $scope.onBlur = jasmine.createSpy("onBlur");
    });
  });

  afterEach(() => {
    $scope.$destroy();
  });

  describe("without initial item", () => {
    beforeEach(() => {
      taskListItemInput = taskListItemInputPageObjectFactory(utils.compile(
        `<task-list-item-input on-change="onChange(item)"></task-list-item-input>`, $scope));
    });

    it("should have an empty value by default", () => {
      expect(taskListItemInput.value()).toBe("");
    });

    describe("Entering an empty text", () => {
      beforeEach(() => {
        taskListItemInput.enterAndBlur("");
      });

      it("should not call on-change handler", () => {
        expect($scope.onChange).not.toHaveBeenCalled();
      });
    });

    describe("Entering an assignee only", () => {
      beforeEach(() => {
        taskListItemInput.enterAndBlur(SOME_ASSIGNEE);
      });

      it("should not call on-change handler", () => {
        expect($scope.onChange).not.toHaveBeenCalled();
      });

      it("should keep value in the input field", () => {
        expect(taskListItemInput.value()).toBe(SOME_ASSIGNEE);
      });
    });

    describe("Entering an assignee with a task", () => {
      beforeEach(() => {
        taskListItemInput.enter(SOME_ASSIGNEE + ": " + SOME_TASK);
      });

      describe("and blur", () => {
        beforeEach(() => {
          taskListItemInput.blur();
        });

        it("should call on-change handler", () => {
          expect($scope.onChange).toHaveBeenCalledWith({
            assignee: SOME_ASSIGNEE,
            task: SOME_TASK
          });
        });

        it("should not clear input field", () => {
          expect(taskListItemInput.value()).not.toBe("");
        });
      });

      describe("and press enter using key", () => {
        beforeEach(() => {
          taskListItemInput.pressEnterUsingKey();
        });

        it("should call on-change handler", () => {
          expect($scope.onChange).toHaveBeenCalledWith({
            assignee: SOME_ASSIGNEE,
            task: SOME_TASK
          });
        });

        it("should not clear input field", () => {
          expect(taskListItemInput.value()).not.toBe("");
        });
      });

      describe("and press enter using key code", () => {
        beforeEach(() => {
          taskListItemInput.pressEnterUsingKeyCode();
        });

        it("should call on-change handler", () => {
          expect($scope.onChange).toHaveBeenCalledWith({
            assignee: SOME_ASSIGNEE,
            task: SOME_TASK
          });
        });

        it("should not clear input field", () => {
          expect(taskListItemInput.value()).not.toBe("");
        });
      });

      describe("and press enter using which", () => {
        beforeEach(() => {
          taskListItemInput.pressEnterUsingWhich();
        });

        it("should call on-change handler", () => {
          expect($scope.onChange).toHaveBeenCalledWith({
            assignee: SOME_ASSIGNEE,
            task: SOME_TASK
          });
        });

        it("should not clear input field", () => {
          expect(taskListItemInput.value()).not.toBe("");
        });
      });
    });
  });

  describe("with initial item", () => {
    beforeEach(() => {
      $scope.initialItem = {
        assignee: SOME_ASSIGNEE,
        task: SOME_TASK
      };
      taskListItemInput = taskListItemInputPageObjectFactory(utils.compile(
        `<task-list-item-input on-change="onChange(item)"  on-blur="onBlur()" initial-item="initialItem"></task-list-item-input>`, $scope));
    });

    it("should populate the value with the initial value", () => {
      expect(taskListItemInput.value()).toBe($scope.initialItem.assignee + ': ' + $scope.initialItem.task);
    });

    describe("and blur without changing input", () => {
      beforeEach(() => {
        taskListItemInput.blur();
      });

      it("should not call on-change handler", () => {
        expect($scope.onChange).not.toHaveBeenCalled();
      });

      it("should call on-blur handler", () => {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });
  });

  describe("with auto-focus", () => {
    let focusSpy;

    beforeEach(() => {
      $scope.initialItem = {
        assignee: SOME_ASSIGNEE,
        task: SOME_TASK
      };
      $scope.autoFocus = true;
      taskListItemInput = taskListItemInputPageObjectFactory(utils.compile(
        `<task-list-item-input on-change="onChange(item)" initial-item="initialItem" auto-focus="autoFocus"></task-list-item-input>`, $scope));
      console.log("taskListItemInput.root.querySelector('input').focus:", taskListItemInput.root.querySelector('input').focus);
      focusSpy = spyOn(taskListItemInput.root.querySelector('input'), "focus").and.callThrough();
      inject(($timeout) => $timeout.flush());
    });

    it("should focus input field", () => {
      expect(focusSpy).toHaveBeenCalled();
    });
  });
});