const getDatabase = require('./database.quotes');
const getApi = require('./api.quotes');
const file = 'quotes.json';
const api = getApi({
  quotes: getDatabase({ file })
});
//const auth = require('./utils/authenticate');

const getUsersDatabase = require('./database.users');
const getUsersApi = require('./api.users');
const usersFile = 'users.json';
const usersApi = getUsersApi({
  users: getUsersDatabase({ usersFile })
});

const authenticate = require('./authenticate');

// MIDDLEWARES
const express = require('express');
const app = express();
app.use(express.json());
app.post('/signup', usersApi.signUp);
app.post('/signin', usersApi.signIn);
app.get('/quotes', api.getQuotes);
app.get('/quotes/:quoteId', api.getQuoteById);
app.post('/quotes', authenticate, api.postQuote);
app.put('/quotes/:quoteId', authenticate, api.putQuote);
app.delete('/quotes/:quoteId', authenticate, api.deleteQuote);

// SERVER
const port = 3000;
const url = `http://localhost:${port}/quotes`;
app.listen(port, () => console.log(`Listening on port ${url}`));
