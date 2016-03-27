export default {
  bindings: {
    item: '<',
    onAdd: '&'
  },

  template: `
    <div><input placeholder="assignee: task" ng-model="$ctrl.newValue" ng-blur="$ctrl.onBlur()" ng-keypress="$ctrl.onKeyPress($event)"></div>`,

  controller: function() {
    let parseItem = (itemString) => {
      var colonIndex = itemString.indexOf(':');
      return colonIndex >= 0 ?
        {
          assignee: itemString.substring(0, colonIndex).trim(),
          task: itemString.substring(colonIndex + 1).trim()
        } : null;
    };

    let clear = () => {
      this.newValue = '';
    };

    clear();

    let update = () => {
      var parsedItem = parseItem(this.newValue || '');
      if (parsedItem) {
        this.onAdd({
          item: parsedItem
        });
        clear();
      }
    };

    this.onBlur = update;

    this.onKeyPress = (event) => {
      console.log("event:" + Object.keys(event));
      if ((event.key === "Enter") || (event.keyCode === 13) || (event.which === 13)) {
        update();
      }
    };
  }
};