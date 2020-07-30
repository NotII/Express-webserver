const owo = require('..');

const test = require('ava');

test('owofy is exported and works', (t) => {
  // Instructs Ava that there will be 4 assertions in this test.
  t.plan(4);

  // Asserts that the owofy function is indeed exported.
  t.is(typeof owo, 'function');

  // Define a Lorem Ipsum input snippet.
  const input = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat! Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur!! Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  // Transform the input.
  const output = owo(input);

  // Asserts that the input has a different length than output.
  t.not(input.length, output.length);

  // Asserts that "Lorem" is transformed into "Wowem".
  t.is(output.slice(0, 5), 'Wowem');

  // Asserts that there can't be 2 or more consecutive exclamation marks.
  t.notRegex(output, /!!+/g);
});

test('faces are exported and work', (t) => {
  // Instructs Ava that there will be 2 assertions in this test.
  t.plan(2);

  // Asserts that the faces are indeed exported.
  t.not(owo.faces, undefined);

  // Asserts that there are more than 0 faces.
  t.true(owo.faces.length > 0);
});
