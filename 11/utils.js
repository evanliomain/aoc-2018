const T = require('taninsam');

module.exports = { makeGrid, toGetter, getMaxSize, makeGridArray };

function makeGrid(serialNumber) {
  const grid = {};
  for (let xi = 1; xi <= 300; xi++) {
    for (let yi = 1; yi <= 300; yi++) {
      grid[`${xi}_${yi}`] = getValue(xi, yi, serialNumber);
    }
  }
  return grid;
}
function makeGridArray(size) {
  const grid = [];
  for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {
      grid.push({ x, y });
    }
  }
  return grid;
}

function getValue(x, y, serialNumber) {
  // Find the fuel cell's rack ID, which is its X coordinate plus 10.
  const rackId = x + 10;
  return (
    T.chain(rackId)
      // Begin with a power level of the rack ID times the Y coordinate.
      .chain(x => x * y)
      // Increase the power level by the value of the grid serial number (your puzzle input).
      .chain(powerLevel => powerLevel + serialNumber)
      // Set the power level to itself multiplied by the rack ID.
      .chain(powerLevel => powerLevel * rackId)
      // Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
      .chain(x => {
        const s = String(x);
        const h = parseInt(s[s.length - 3], 10);
        return isNaN(h) ? 0 : h;
      })
      // Subtract 5 from the power level.
      .chain(x => x - 5)
      .value()
  );
}

function getMaxSize(size) {
  return gridGetter => {
    const values = [];

    for (let xi = 1; xi <= 300 - size + 1; xi++) {
      for (let yi = 1; yi <= 300 - size + 1; yi++) {
        values.push({
          x: xi,
          y: yi,
          size,
          value: getSquareValue(gridGetter, xi, yi, size)
        });
      }
    }
    return T.chain(values)
      .chain(T.maxBy(({ value }) => value))
      .value();
  };
}

function toGetter(grid) {
  return (x, y) => grid[`${x}_${y}`];
}

function getSquareValue(getter, x, y, size) {
  let sum = 0;
  for (let xi = x; xi < x + size; xi++) {
    for (let yi = y; yi < y + size; yi++) {
      sum += getter(xi, yi);
    }
  }
  return sum;
}
