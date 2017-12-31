const assert = require('assert');
const app = require('../src/index');

const Console = console;

describe('curreny', () => {
  describe('request', () => {
    it(' true', () => {
      assert.equal(true, true);
    });
    it('conversion', () => {
      assert.equal(12, app().conversion(10, 1.2));
      Console.log('hell');
    });
    it('result', () => {
      app().result('EUR', 'USD', 10, (params1, params) => {
        assert.equal('12.5 USD', params1 + params);
      });
    });
  });
});
