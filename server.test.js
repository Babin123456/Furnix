const assert = require('node:assert/strict');
const test = require('node:test');
const app = require('./server');

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('serves the storefront entry point', async () => {
  const response = await fetch(`${baseUrl}/`);

  assert.equal(response.status, 200);
  assert.match(await response.text(), /Furnix/i);
});

test('keeps contact API validation available', async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'A', email: 'invalid', message: 'Short' })
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    success: false,
    message: 'Please provide valid contact information.'
  });
});

test('returns a JSON 404 for unknown routes', async () => {
  const response = await fetch(`${baseUrl}/missing-route`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    success: false,
    message: 'The requested resource was not found.'
  });
});
