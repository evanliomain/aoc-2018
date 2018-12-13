const { tick } = require('./utils');

module.exports = function({ circuit, carts }) {
  const next = tick(circuit, true);
  try {
    while (true) {
      carts = next(carts);
    }
  } catch (e) {
    return e.message;
  }
};
