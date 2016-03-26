export default {
  bindings: {
    item: '<',
    onDelete: '&'
  },
  
  template: `
    <span class="assignee">{{ $ctrl.item.assignee }}</span>
    <span class="task">{{ $ctrl.item.task }}</span>
    <button class="delete" ng-click="$ctrl.onDelete({item: $ctrl.item})">Delete</button>`,
  
  controller: function() {
    this.onDelete
  }
};