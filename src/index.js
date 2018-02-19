  /* eslint-disable global-require */
const API = require('currency-conversion');
  // api key for https://currencylayer.com/
const api = new API({ access_key: ['1d36e5db73566dda4cf57cb2af474e19']});
  /* eslint-enable global-require */
const Console = console;
const liveQuery = { source: 'USD',currencies: []};

function help() {
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
}
// multiplica a valor dado pelo valor do cambio 
const conversion = (value, rate)=>{
  return value * rate;
}
async function result(from, to, value, collback) {
  try {
      var result = await api.live(liveQuery); 
      const quotes = result.quotes;
      const $from = quotes[`USD${from}`];
      const $to = quotes[`USD${to}`];
      collback(`${value} ${from}`, from.toUpperCase() === 'USD' ? `${conversion(value, $to)} ${to}` : `${conversion(value, $to / $from)} ${to}`);
  
  } catch (error) {
    Console.log(error);
    Console.log(`Live (Error): ${JSON.stringify(err)}`);
  }
}

module.exports.app = {result,help}