export default {
  template: `<h1>Task List</h1>
    <task-list-item ng-repeat="task in $ctrl.list" item="task" on-delete="$ctrl.onDelete(item)"></task-list-item>
    <task-list-item-add on-add="$ctrl.onAdd(item)"></task-list-item-add>`,
    
  controller: ["taskService", function(taskService) {
    let refresh = () => {
      this.list = taskService.list();
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
  }]
};