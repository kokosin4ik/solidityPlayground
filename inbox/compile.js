const path = require('path');
const fs   = require('fs');
const solc = require('solc');

const solPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source  = fs.readFileSync(solPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];
