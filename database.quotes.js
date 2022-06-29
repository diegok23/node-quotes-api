const fs = require('fs');

function getDatabase(deps) {
  function getQuotesFile() {
    const text = fs.readFileSync(deps.file);
    return JSON.parse(text);
  }

  function saveQuotesToFile(arr) {
    fs.writeFileSync(deps.file, JSON.stringify(arr, null, 2));
  }  

  return {
    getQuotesFile,
    saveQuotesToFile,
  };
}

module.exports = getDatabase;
