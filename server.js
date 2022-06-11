const getDatabase = require('./quotes');
const getApi = require('./api');
const file = 'quotes.json';
const api = getApi({
  quotes: getDatabase({ file })
});

// MIDDLEWARES
const express = require('express');
const app = express();
app.use(express.json());
app.get('/quotes', api.getQuotes);
app.get('/quotes/:quoteId', api.getQuoteById);
app.post('/quotes', api.postQuote);
app.put('/quotes/:quoteId', api.putQuote);
app.delete('/quotes/:quoteId', api.deleteQuote);

// SERVER
const port = 3000;
const url = `http://localhost:${port}/quotes`;
app.listen(port, () => console.log(`Listening on port ${url}`));
