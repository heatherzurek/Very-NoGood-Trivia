import {greeting} from './../src/functions';

/* eslint-disable no-undef */
test('check that greeting() returns a string', function() {
  var string = greeting();
  expect(typeof string).toBe("string");
});