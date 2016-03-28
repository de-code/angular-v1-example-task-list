export default {
  bindings: {
    initialItem: '<',
    autoFocus: '<',
    onChange: '&',
    onBlur: '&'
  },

  template: `
    <div><input placeholder="assignee: task" focus-if="$ctrl.autoFocus" ng-model="$ctrl.itemAsString" ng-blur="$ctrl._onBlur()" ng-keypress="$ctrl.onKeyPress($event)"></div>`,

  controller: function() {
    let parseItem = (itemString) => {
      var colonIndex = itemString.indexOf(':');
      return colonIndex >= 0 ?
        {
          assignee: itemString.substring(0, colonIndex).trim(),
          task: itemString.substring(colonIndex + 1).trim()
        } : null;
    };

    this.clear = () => {
      this.itemAsString = '';
    };

    this.$onInit = () => {
      this.clear();
      if (this.initialItem) {
        this.itemAsString = this.initialItem.assignee + ': ' + this.initialItem.task;
      }
    }

    let update = () => {
      var parsedItem = parseItem(this.itemAsString || '');
      if (parsedItem) {
        if ((!this.initialItem) || (!angular.equals(this.initialItem, parsedItem))) {
          this.onChange({
            item: parsedItem,
            input: this
          });
        }
      }
    };

    this._onBlur = () => {
      update();
      if (this.onBlur) {
        this.onBlur();
      }
    };

    this.onKeyPress = (event) => {
      if ((event.key === "Enter") || (event.keyCode === 13) || (event.which === 13)) {
        update();
      }
    };
  }
};