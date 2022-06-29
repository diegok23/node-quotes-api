const fs = require('fs');

function getDatabase(deps) {
  function getUsersFile() {
    const text = fs.readFileSync(deps.usersFile);
    return JSON.parse(text);
  }
  
  function saveUsersToFile(arr) {
    fs.writeFileSync(deps.usersFile, JSON.stringify(arr, null, 2));
  }
  return {
    saveUsersToFile,
    getUsersFile
  };
}

module.exports = getDatabase;
