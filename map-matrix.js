const T = require('taninsam');

module.exports = function mapMatrix(iteree) {
  return matrix => {
    return T.chain(matrix)
      .chain(
        T.map((row, y) =>
          T.chain(row)
            .chain(T.map((cell, x) => iteree(cell, x, y, matrix)))
            .value()
        )
      )
      .value();
  };
};
