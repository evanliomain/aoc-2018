const { tick } = require('./utils');

module.exports = function({ circuit, carts }) {
  const next = tick(circuit);
  try {
    while (true) {
      carts = next(carts);
    }
  } catch (e) {
    return e.message;
  }
};
