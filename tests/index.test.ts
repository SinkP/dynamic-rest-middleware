import helloWorld from '../src/index';

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('Testing hello world', () => {
  expect(helloWorld()).toBe('Hello world');
})
