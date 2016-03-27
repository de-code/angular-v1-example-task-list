export default (eventName, keyProps) => {
  // Note: this is using a deprecated API and should be revised
  var params = { bubbles: false, cancelable: false, detail: keyProps };
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
  for (let k in keyProps) {
    Object.defineProperty(event, k, {
      get : function() {
        return keyProps[k];
      }
    });
  }
  return event;
}