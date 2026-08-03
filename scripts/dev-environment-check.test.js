const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

test('Environment Check - Verify Essential Project Files Exist', () => {
  const essentialFiles = [
    'index.html',
    'furniture.html',
    'cart.html',
    'account.html',
    'style.css',
    'app.js',
    'server.js',
    'package.json',
    'README.md',
    'ARCHITECTURE.md'
  ];

  essentialFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    assert.strictEqual(fs.existsSync(filePath), true, `Missing essential file: ${file}`);
  });
});

test('Environment Check - Verify Essential Documentation Files Exist', () => {
  const docFiles = [
    'docs/DEPLOYMENT.md',
    'docs/STOREFRONT_ARCHITECTURE.md',
    'docs/CLIENT_API_REFERENCE.md',
    'docs/DEVELOPER_GUIDE.md'
  ];

  docFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    assert.strictEqual(fs.existsSync(filePath), true, `Missing documentation file: ${file}`);
  });
});
