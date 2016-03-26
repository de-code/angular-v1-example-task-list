export default {
  trigger: (e, eventName) => e.dispatchEvent(new Event(eventName)),

  enterAndBlur: function(input, value) {
    input.value = value;
    this.trigger(input, 'change');
    this.trigger(input, 'blur');
  },

  textContentOrNull: (e) => e ? e.textContent : null,

  domElement: (e) => e.length > 0 ? e[0] : e,

  // Note: Array.from or spread operator should have worked too... but didn't in PhantomJS
  toArray: (nodeList) => Array.prototype.slice.call(nodeList)
};