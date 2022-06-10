function getApi(deps) {
  const getQuotes = (req, res) => {
    const quotes = deps.quotes.getQuotesFile();
    res.send(quotes);
  };

  const getQuoteById = (req, res) => {
    const quotes = deps.quotes.getQuotesFile();
    const id = Number(req.params.quoteId);
    const index = quotes.findIndex((user) => user.id === id);
    res.send(quotes[index]);
  };

  const postQuote = (req, res) => {
    const newQuote = req.body;
    const quotes = deps.quotes.getQuotesFile();
    const lastQuoteId = Number(quotes[quotes.length - 1].id);
    newQuote.id = lastQuoteId + 1;
    quotes.push(newQuote);
    deps.quotes.saveQuotesToFile(quotes);
    res.send(newQuote);
  };

  const putQuote = (req, res) => {
    const modifiedQuote = req.body;
    const quotes = deps.quotes.getQuotesFile();
    const id = Number(req.params.quoteId);
    const quote = quotes.find((quote) => quote.id === id);
    if (quote) {
      quote.quote = modifiedQuote.quote;
      quote.author = modifiedQuote.author;
      deps.quotes.saveQuotesToFile(quotes);
      res.send(quote);
    } else {
      res.send(`Nothing to modify, there isn't any register with id: ${id}`);
    }
  };

  const deleteQuote = (req, res) => {
    let quotes = deps.quotes.getQuotesFile();
    const id = Number(req.params.quoteId);
    const deletedQuote = quotes.find((quote) => quote.id === id);
    if (deletedQuote) {
      quotes = quotes.filter((quote) => quote.id !== id);
      deps.quotes.saveQuotesToFile(quotes);
      res.send(deletedQuote);
    } else {
      res.send(`Nothing to delete, there isn't any register with id: ${id}`);
    }
  };
  return {
    getQuotes,
    getQuoteById,
    postQuote,
    putQuote,
    deleteQuote
  };
}
module.exports = getApi;
