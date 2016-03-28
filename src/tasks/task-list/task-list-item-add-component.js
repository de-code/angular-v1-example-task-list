export default {
  bindings: {
    onAdd: '&'
  },

  template: `
    <div><task-list-item-input on-change="$ctrl.onChange(item, input)"></task-list-item-input></div>`,

  controller: function() {
    this.onChange = (item, input) => {
      this.onAdd({ item });
      input.clear();
    };
  }
};