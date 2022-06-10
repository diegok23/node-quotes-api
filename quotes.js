const fs = require('fs');
const file = 'quotes.json';

function getQuotesFile() {
  const text = fs.readFileSync(file);
  return JSON.parse(text);
}

function saveQuotesToFile(arr) {
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
}

module.exports = {
    getQuotesFile,
    saveQuotesToFile,
}