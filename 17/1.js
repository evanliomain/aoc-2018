const fs = require('fs');
const T = require('taninsam');
const {
  getBounds,
  makeMatrix,
  printMatrix,
  write,
  countWater,
  countFixWater,
  get
} = require('./utils');
module.exports = function(input) {
  const matrix = makeMatrix(input);
  let flow;
  let round = 0;

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

        if ('#' === get(matrix, y, x - 1)) {
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
    round++;
    // console.log(`---------------------${round}----------------------`);
    // console.log(printMatrix(matrix));
  } while (flow);

  console.log(printMatrix(matrix));
  // write(printMatrix(matrix), '-full');

  return countFixWater(matrix);
};

// Chelou 1447
