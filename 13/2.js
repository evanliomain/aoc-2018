const T = require('taninsam');
const { tick2 } = require('./utils');

module.exports = function({ circuit, carts }) {
  console.log(carts);

  const next = tick2(circuit);
  try {
    while (true) {
      carts = next(carts);
    }
  } catch (e) {
    return e.message;
  }
};
