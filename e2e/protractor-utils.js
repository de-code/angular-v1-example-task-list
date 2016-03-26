export default {
  enterAndBlur: function(input, value) {
    input.click();
    input.clear();
    input.sendKeys(value);
    input.sendKeys(protractor.Key.TAB);
  }
};