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
  get,
  flowOfWater
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
    .chain(x => x + 1)
    .value();
  const X_MIN = T.chain(input)
    .chain(T.values())
    .chain(T.map(({ x }) => x))
    .chain(T.min())
    .chain(x => x - 1)
    .value();

  return { X_MIN, X_MAX, Y_MIN, Y_MAX };
}

function makeMatrix(input) {
  const { X_MIN, X_MAX, Y_MIN, Y_MAX } = getBounds(input);
  const matrix = [];
  for (let y = Y_MIN - 1; y <= Y_MAX; y++) {
    const row = [];
    for (let x = X_MIN; x <= X_MAX; x++) {
      if (500 === x && Y_MIN - 1 === y) {
        row.push('+');
      } else if (500 === x && Y_MIN === y) {
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

function flowOfWater(matrix) {
  let flow;

  do {
    flow = false;
    matrix.forEach((row, y) => {
      row.forEach((cell, x) => {
        if ('|' !== cell) {
          return;
        }

        if ('.' === get(matrix, y + 1, x)) {
          // Water fall
          matrix[y + 1][x] = '|';
          flow = true;
        }
        if ('#' === get(matrix, y + 1, x) || '~' === get(matrix, y + 1, x)) {
          // Water flow
          if ('.' === get(matrix, y, x - 1)) {
            matrix[y][x - 1] = '|';
            flow = true;
          }
          if ('.' === get(matrix, y, x + 1)) {
            matrix[y][x + 1] = '|';
            flow = true;
          }
        }

        // Replace #|||||||# by #~~~~~~~#
        if (
          '#' === get(matrix, y, x - 1) &&
          ('#' === get(matrix, y + 1, x) || '~' === get(matrix, y + 1, x))
        ) {
          let waterfall = true;
          let continuous = true;
          let i = x + 1;
          while (waterfall) {
            switch (get(matrix, y, i)) {
              case '|':
                break;
              case '#':
                waterfall = false;
                break;
              case '.':
                continuous = false;
                waterfall = false;
                break;
            }
            i++;
          }
          if (continuous) {
            for (let j = x; j < i - 1; j++) {
              matrix[y][j] = '~';
            }
            flow = true;
          }
        }
      });
    });
  } while (flow);
  return matrix;
}
