const T = require('taninsam');
const fs = require('fs');
const patternMatching = require('../pattern-matching');
module.exports = {
  getBounds,
  makeMatrix,
  printMatrix,
  write,
  countWater,
  countFixWater,
  get
};

function getBounds(input) {
  const Y_MAX = T.chain(input)
    .chain(T.values())
    .chain(T.map(({ y }) => y))
    .chain(T.max())
    .value();
  const Y_MIN = T.chain(input)
    .chain(T.values())
    .chain(T.map(({ y }) => y))
    .chain(T.min())
    .value();

  const X_MAX = T.chain(input)
    .chain(T.values())
    .chain(T.map(({ x }) => x))
    .chain(T.max())
    .value();
  const X_MIN = T.chain(input)
    .chain(T.values())
    .chain(T.map(({ x }) => x))
    .chain(T.min())
    .value();

  return { X_MIN, X_MAX, Y_MIN, Y_MAX };
}

function makeMatrix(input) {
  const { X_MIN, X_MAX, Y_MIN, Y_MAX } = getBounds(input);
  const matrix = [];
  for (let y = 0; y <= Y_MAX; y++) {
    const row = [];
    for (let x = X_MIN; x <= X_MAX; x++) {
      if (500 === x && 0 === y) {
        row.push('+');
      } else if (500 === x && 1 === y) {
        row.push('|');
      } else if (undefined !== input[`${x},${y}`]) {
        row.push('#');
      } else {
        row.push('.');
      }
    }
    matrix.push(row);
  }
  return matrix;
}

function printMatrix(matrix) {
  return T.chain(matrix)
    .chain(T.map(T.join('')))
    .chain(T.join('\n'))
    .value();
}

function write(data, flag = '') {
  fs.writeFileSync(`./output/17${flag}.txt`, data);
}

function countWater(matrix) {
  return T.chain(matrix)
    .chain(
      T.map(T.sumBy(patternMatching(['|', () => 1], ['~', () => 1], [() => 0])))
    )
    .chain(T.sum())
    .value();
}
function countFixWater(matrix) {
  return T.chain(matrix)
    .chain(T.map(T.sumBy(patternMatching(['~', () => 1], [() => 0]))))
    .chain(T.sum())
    .value();
}
function get(matrix, y, x) {
  if (undefined === matrix[y]) {
    return null;
  }
  if (undefined === matrix[y][x]) {
    return null;
  }
  return matrix[y][x];
}
