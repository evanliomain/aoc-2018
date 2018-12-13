const T = require('taninsam');

module.exports = function(input) {
  const carts = [];
  let i = 0;
  return T.chain(input)
    .chain(T.map(T.split()))
    .chain(
      T.map((row, y) =>
        row.map((cell, x) => {
          if ('>' === cell || '<' === cell || '^' === cell || 'v' === cell) {
            carts.push({ direction: cell, x, y, counter: 0, i });
            i++;
          }
          if ('>' === cell || '<' === cell) {
            return '-';
          }
          if ('^' === cell || 'v' === cell) {
            return '|';
          }
          return cell;
        })
      )
    )
    .chain(circuit => ({ circuit, carts }))
    .value();
};
