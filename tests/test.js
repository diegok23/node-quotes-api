const getDatabase = require('../quotes.js');
const database = getDatabase({ file: './quotes.json' });

describe('WHEN calling getQuotesFile', () => {
  it(`THEN should return an array with length > 0`, () => {
    const quotesContent = database.getQuotesFile();
    expect(quotesContent.length > 0).toBe(true);
  });
});

describe('WHEN calling saveQuotesToFile', () => {
  it(`THEN should return `, () => {
    const arr = [
      {
        text: 'test',
        author: 'test'
      }
    ];
    console.log(database);
    const newDatabase = database.push(arr)
    database.saveQuotesToFile(newDatabase);
    const quotesContent = database.getQuotesFile();
    expect(databaseArr.length > database.length).toBe(true);
  });
});
