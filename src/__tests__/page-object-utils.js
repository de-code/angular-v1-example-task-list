import createKeyEvent from "./create-key-event";

export default {
  trigger: (e, eventName) => e.dispatchEvent(new Event(eventName)),

  triggerKeyEvent: (e, eventName, keyProps) => e.dispatchEvent(createKeyEvent(eventName, keyProps)),

  enter: function(input, value) {
    input.value = value;
    this.trigger(input, 'change');
  },

  enterAndBlur: function(input, value) {
    this.enter(input, value);
    this.trigger(input, 'blur');
  },

  pressEnter: function(input) {
    this.triggerKeyEvent(input, 'keypress', {
      key: "Enter",
      keyCode: 13
    });
  },

  textContentOrNull: (e) => e ? e.textContent : null,

  domElement: (e) => e && e.length > 0 ? e[0] : e,

  // Note: Array.from or spread operator should have worked too... but didn't in PhantomJS
  toArray: (nodeList) => Array.prototype.slice.call(nodeList)
};