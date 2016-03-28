export default {
  bindings: {
    item: '<',
    onDelete: '&',
    onChange: '&'
  },

  template: `
    <div class="view-mode" ng-if="!$ctrl.editMode" ng-click="$ctrl.enableEditMode()">
      <span class="assignee">{{ $ctrl.item.assignee }}</span>
      <span class="task">{{ $ctrl.item.task }}</span>
      <button class="delete" ng-click="$ctrl.onDelete({item: $ctrl.item})">Delete</button>
    </div>
    <task-list-item-input ng-if="$ctrl.editMode" auto-focus="true" initial-item="$ctrl.item" on-change="$ctrl._onChange(item)" on-blur="$ctrl._onBlur()"></task-list-item-input>
    `,

  controller: function() {
    this.editMode = false;

    this.enableEditMode = () => {
      this.editMode = true;
    };

    this._onChange = (item) => {
      if (this.onChange) {
        this.onChange({ item });
      }
    };

    this._onBlur = () => {
      this.editMode = false;
    };
  }
};