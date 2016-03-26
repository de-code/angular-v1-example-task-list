Unit Testing Components
=======================

Introduction
------------
This section describe how to unit test Angular components.
Some of he guide lines may also be applicable to other kind of compoents.

One thing to note is that while it is called unit tests here, some purist may argue that they are more like integration tests.
The purpose of this page is not to argue about that point, you may insert the term of your choice.


Comparison with end to end tests
--------------------------------
Protractor or other kind of Selenium tests usually drive a browser to test your whole app by simulating clicks.
Those tests are usually referred to as end to end tests.
The tests described here are only testing the component under test.
Whilest DOM elements are created, they don't necessarily need to be rendered.
All of the backend will be mocked, the tests are therefore much faster than end to end tests.
When testing higher level components, sub-components are usually not mocked (see design considerations)

Design considerations
---------------------

### Testing higher level components
When testing services, you would want to mock all of its dependencies.
Applying that approach to components could get complicated.
For example when testing a 'task list', you could mock the 'task item' component.
But you would then need to define the behaviour of your mocked component.
Once that is done, how confident are you that it also works with the real component?
The alternative to that mocking the component is to just use the real component.
You then wouldn't test the child component again, but enough to satisfy yourself that you are using it correctly (e.g. all of the bindings are excercised).
The right approach may depend on your use case.

### Browser testing
Karma is used to run the tests.
While Karma could be run in real browsers, it would test that your JavaScript works in the browser.
But it does not mean that the component works, because the tests are triggering events directly (e.g. clicking on hidden elements).
End to end tests are better for that purpose.

How it works technically
------------------------

### Define a page object
Page objects define the interaction with your page, or component in that case. You could call it component object if you like.
The purpose of the page object is to keep your tests focused (and readable)

A page object could look like this:

src/login/\_\_tests\_\_/login.page-object.js
```javascript
export default (root) => {
  return {
    enterUsername: (username) => root[0].querySelector(".username").value = username,
    enterPassword: (password) => root[0].querySelector(".password").value = username,
    clickSubmit: () => root[0].querySelector("[type=submit]").click()
  };
};
```

The above example assumes that root is a jquery lite element (an array of DOM elements).
If you used jquery, then you could make use of jquery's functionality to access elements.
The example project is using the DOM API with some small helper functions.

A simple specification may then look like this:

src/login/\_\_tests\_\_/login.spec.js
```javascript
import angular from "angular";
import "angular-mocks";

import loginModule from "../index.js";

import loginPageObjectFactory from "./login.page-object.js";

describe("Login component", () => {
  const SOME_USERNAME = "me";
  const SOME_PASSWORD = "let me in";

  let $scope;
  let $q;
  let login;
  let loginService

  beforeEach(() => {
    loginService = jasmine.createSpyObj("loginService", ["login"]);

    var testModule = angular.module("login.test", [loginModule.name])
      .value("loginService", loginService);
    angular.mock.module(testModule.name);

    inject(($rootScope, $compile, _$q_) => {
      $q = _$q_;
      $scope = $rootScope.$new();
      $scope.onLogin = jasmine.createSpy("onLogin");
      $scope.onError = jasmine.createSpy("onError");
      login = loginPageObjectFactory($compile(
        `<login on-login="onLogin()" on-error="onError()"></login>`, $scope));
      $scope.$apply();
    });
  });

  afterEach(() => {
    $scope.$destroy();
  });

  describe("Entering valid login details", () => {
    beforeEach(() => {
      loginService.login.and.returnValue($q.when());
      login.enterUsername(SOME_USERNAME);
      login.enterPassword(SOME_PASSWORD);
      login.clickSubmit();
    });

    it("should call on-login handler", () => {
      expect($scope.onLogin).toHaveBeenCalled();
    });

    it("should not call on-error handler", () => {
      expect($scope.onError).not.toHaveBeenCalled();
    });
  });

  describe("Entering invalid login details", () => {
    beforeEach(() => {
      loginService.login.and.returnValue($q.reject("Error"));
      login.enterUsername(SOME_USERNAME);
      login.enterPassword(SOME_PASSWORD);
      login.clickSubmit();
    });

    it("should not call on-login handler", () => {
      expect($scope.onLogin).not.toHaveBeenCalled();
    });

    it("should call on-error handler", () => {
      expect($scope.onError).toHaveBeenCalled();
    });
  });
});
```


Guide lines
-----------

### Make your tests descriptive
Your tests should describe exactly what you are expecting the component to do.

don't:
```javascript
it("should behave correctly", ...);
```

do:
```javascript
it("should call methodX", ...);
```

### Keep your tests focused
Your tests ('it') should be readable and briefly implement what the description says it does.
Any code that doesn't relate to the description should be moved elsewhere or get removed.

don't:
```javascript
it("should call methodX", () => {
  button.click();
  expect(methodX).toHaveBeenCalled();
});
```

do:
```javascript
it("should call methodX when button is clicked", () => {
  button.click();
  expect(methodX).toHaveBeenCalled();
});
```
(also consider separating actions from assertions)

### Keep your describe sections focused
Similar to the previous point, any beforeEach within a describe section (apart from the top level one) should directly relate to the description.
Anything else doesn't belong there.

don't:
```javascript
describe("clicking button", () => {
  beforeEach(() => {
    input.enter("test");
    button.click();
  });
});
```

do:
```javascript
describe("entering 'test' and clicking button", () => {
  beforeEach(() => {
    input.enter("test");
    button.click();
  });
});
```

### Limit the number of assertions within a test
Having multiple tests might save a few characters but will get in the way when tests are failing.
By having separate tests instead, you can tell more easily which test is broken.

don't:
```javascript
it("should call methodX and methodY", () => {
  expect(methodX).toHaveBeenCalled();
  expect(methodY).toHaveBeenCalled();
});
```

do:
```javascript
it("should call methodX", () => {
  expect(methodX).toHaveBeenCalled();
});

it("should call methodY", () => {
  expect(methodY).toHaveBeenCalled();
});
```

### Separate actions from assertions
Actions have side effects that you want to test. Often there are more than one.
By moving the action into a beforeEach of a describe block, you can test all of the individual side effects individually.
Apart from making it easier where it went wrong, it also makes it easier to nest further actions.

don't:
```javascript
it("should call methodX when button is clicked", () => {
  button.click();
  expect(methodX).toHaveBeenCalled();
});
```

do:
```javascript
describe("clicking button", () => {
  beforeEach(() => {
    button.click();
  });

  it("should call methodX", () => {
    expect(methodX).toHaveBeenCalled();
  });
});
```

