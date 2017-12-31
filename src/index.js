module.exports = function index() {
  /* eslint-disable global-require */
  const API = require('currency-conversion');
  // api key for https://currencylayer.com/
  const api = new API({
    access_key: ['1d36e5db73566dda4cf57cb2af474e19'],
  });
  /* eslint-enable global-require */
  const Console = console;
  const liveQuery = {
    source: 'USD',
    currencies: [],
  };

  const currency = {
    help() {
      api.list(liveQuery, (err, result) => {
        if (err) {
          Console.log(err);
          Console.log(`Live (Error): ${JSON.stringify(err)}`);
        } else {
          Console.log();
          Console.log('Currencies: ');
          Console.log(result.currencies);
        }
      });
    },
    conversion(value, rate) {
      return value * rate;
    },
    result(from, to, value, collback) {
      const $this = this;
      api.live(liveQuery, (err, result) => {
        if (err) {
          Console.log(err);
          Console.log(`Live (Error): ${JSON.stringify(err)}`);
        } else {
          const string = JSON.stringify(result.quotes);
          const quotes = JSON.parse(string);

          const $from = quotes[`USD${from}`];
          const $to = quotes[`USD${to}`];

          collback(`${value} ${from}`, from.toUpperCase() === 'USD' ? `${$this.conversion(value, $to)} ${to}` : `${$this.conversion(value, $to / $from)} ${to}`);
        }
      });
    },
  };

  return currency;
};
