var suite1 = GE.registerSuite({
  name: "Set Viewport",
  code: 'viewportsFTW!'
})

suite1.registerTest({
  description: "A meta tag describes the viewport.",
  active_test: function (iWant) {
    return iWant.onlyOneOf.theseNodes('meta').attribute('name').toEqual('viewport');
  }
})

suite1.registerTest({
  description: "A meta tag sets the content.",
  active_test: function (iWant) {
    return iWant.onlyOneOf.theseNodes('meta').attribute('content').toEqual('width=device-width, initial-scale=1.0');
  }
})