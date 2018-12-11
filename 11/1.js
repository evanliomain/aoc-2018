const T = require('taninsam');

module.exports = function(input) {
  const grid = makeGrid(input);

  const values = [];

  for (let xi = 0; xi <= 298; xi++) {
    for (let yi = 0; yi <= 298; yi++) {
      values.push({
        x: xi,
        y: yi,
        value:
          grid[`${xi}_${yi}`] +
          grid[`${xi + 1}_${yi}`] +
          grid[`${xi + 2}_${yi}`] +
          grid[`${xi}_${yi + 1}`] +
          grid[`${xi + 1}_${yi + 1}`] +
          grid[`${xi + 2}_${yi + 1}`] +
          grid[`${xi}_${yi + 2}`] +
          grid[`${xi + 1}_${yi + 2}`] +
          grid[`${xi + 2}_${yi + 2}`]
      });
    }
  }
  return T.chain(values)
    .chain(T.maxBy(({ value }) => value))
    .chain(({ x, y }) => `${x},${y}`)
    .value();
};

function makeGrid(serialNumber) {
  const grid = {};
  for (let xi = 0; xi <= 300; xi++) {
    for (let yi = 0; yi <= 300; yi++) {
      grid[`${xi}_${yi}`] = getValue(xi, yi, serialNumber);
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
