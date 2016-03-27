export default {
  template: `<h1>Task List</h1>
    <section class="undo-redo">
      <button class="undo" ng-click="$ctrl.onUndo()" ng-disabled="!$ctrl.hasUndo">Undo</button>
      <button class="redo" ng-click="$ctrl.onRedo()" ng-disabled="!$ctrl.hasRedo">Redo</button>
    </section>
    <task-list-item ng-repeat="task in $ctrl.list" item="task" on-delete="$ctrl.onDelete(item)"></task-list-item>
    <task-list-item-add on-add="$ctrl.onAdd(item)"></task-list-item-add>`,

  controller: ["taskService", function(taskService) {
    let refresh = () => {
      this.list = taskService.list().toArray();
      this.hasUndo = taskService.history().hasUndo();
      this.hasRedo = taskService.history().hasRedo();
    }

    refresh();

    this.onAdd = (item) => {
      taskService.add(item);
      refresh();
    };

    this.onDelete = (item) => {
      taskService.remove(item);
      refresh();
    };

    this.onUndo = () => {
      taskService.history().undo();
      refresh();
    };

    this.onRedo = () => {
      taskService.history().redo();
      refresh();
    };
  }]
};