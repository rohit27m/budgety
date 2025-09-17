#!/usr/bin/env node
const os = require('os');

const port = process.env.PORT || 3000;
const interfaces = os.networkInterfaces();
let local = 'http://localhost:' + port;
let network = null;

for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name] || []) {
    if (iface.family === 'IPv4' && !iface.internal) {
      network = `http://${iface.address}:${port}`;
      break;
    }
  }
  if (network) break;
}

console.log('');
console.log('You can now view frontend in the browser.');
console.log('');
console.log('  Local:            ' + local);
if (network) {
  console.log('  On Your Network:  ' + network);
} else {
  console.log('  On Your Network:  (no IPv4 found)');
}
console.log('');
console.log('Note: Keep this terminal open while running the dev server.');
