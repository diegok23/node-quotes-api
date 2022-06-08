const express = require('express');
const app = express();
const fs = require('fs');

const file = 'quotes.json';

// AUX FUNCTIONS
function getQuotesFromDatabase() {
  const text = fs.readFileSync(file);
  return JSON.parse(text);
}

function saveQuotesToDatabase(arr) {
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
}

// FUNCTIONS
const getQuotes = function (request, response) {
  const quotes = getQuotesFromDatabase();
  response.send(quotes);
};

const getQuoteById = (req, res) => {
  const quotes = getQuotesFromDatabase();
  const id = Number(req.params.quoteId);
  const index = quotes.findIndex((user) => user.id === id);
  res.send(quotes[index]);
};

const postQuote = (req, res) => {
  const newQuote = req.body;
  const quotes = getQuotesFromDatabase();
  newQuote.id = quotes.length;
  quotes.push(newQuote);
  saveQuotesToDatabase(quotes);
  res.send(quotes);
};

const putQuote = (req, res) => {
  const modifiedQuote = req.body;
  const quotes = getQuotesFromDatabase();
  const id = Number(req.params.quoteId);
  const quote = quotes.find((quote) => quote.id === id);
  quote.quote = modifiedQuote.quote;
  quote.author = modifiedQuote.author;
  saveQuotesToDatabase(quotes);
  res.send(quote);
};

const deleteQuote = (req, res) => {
  let quotes = getQuotesFromDatabase();
  const id = Number(req.params.quoteId);
  const deletedQuote = quotes.find((quote) => quote.id === id);
  quotes = quotes.filter((quote) => quote.id !== id);
  saveQuotesToDatabase(quotes);
  res.send(deletedQuote);
};

// MIDDLEWARES
app.use(express.json());
app.get('/quotes', getQuotes);
app.get('/quotes/:quoteId', getQuoteById);
app.post('/quotes', postQuote);
app.put('/quotes/:quoteId', putQuote);
app.delete('/quotes/:quoteId', deleteQuote);

// SERVER
const port = 3000;
const url = `http://localhost:${port}/quotes`;
app.listen(port, () => console.log(`Listening on port ${url}`));
