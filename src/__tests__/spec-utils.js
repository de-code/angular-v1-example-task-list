export default {
  compile: (html, $scope) => {
    let element;
    inject(($compile) => {
      element = $compile(html)($scope);
      $scope.$apply();
    });
    return element;
  }
};