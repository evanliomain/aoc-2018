const T = require('taninsam');

module.exports = function(input) {
  let area = 1125402654900;
  for (let seconds = 0; seconds < 1000000; seconds++) {
    let newArea = getArea(getBounds(input));
    if (newArea < area) {
      area = newArea;
      console.log('area', area);
      if (area < 1000) {
        display(input, seconds);
      }
    }
    input = move(input);
  }

  return getBounds(input);
};

function display(coords, seconds) {
  const { X_MIN, X_MAX, Y_MIN, Y_MAX } = getBounds(coords);
  const coordsMap = T.fromEntries()(coords);

  console.log('------', seconds, '------');
  const area = Math.abs(X_MAX - X_MIN) * Math.abs(Y_MAX - Y_MIN);
  console.log('Area', area);

  for (let yi = Y_MIN; yi <= Y_MAX; yi++) {
    line = '';
    for (let xi = X_MIN; xi <= X_MAX; xi++) {
      if (undefined === coordsMap[`${xi}_${yi}`]) {
        line += ' ';
      } else {
        line += '#';
      }
    }
    console.log(line);
  }
  console.log('-----------------------------------------');
}

function move(coords) {
  return T.chain(coords)
    .chain(
      T.map(([, { x, y, vx, vy }]) => ({
        x: x + vx,
        y: y + vy,
        vx,
        vy
      }))
    )
    .chain(T.map(({ x, y, vx, vy }) => [`${x}_${y}`, { x, y, vx, vy }]))
    .value();
}
function getBounds(coords) {
  const X_MIN = T.chain(coords)
    .chain(T.minBy(([, { x }]) => x))
    .chain(([, { x }]) => x)
    .value();
  const X_MAX = T.chain(coords)
    .chain(T.maxBy(([, { x }]) => x))
    .chain(([, { x }]) => x)
    .value();
  const Y_MIN = T.chain(coords)
    .chain(T.minBy(([, { y }]) => y))
    .chain(([, { y }]) => y)
    .value();
  const Y_MAX = T.chain(coords)
    .chain(T.maxBy(([, { y }]) => y))
    .chain(([, { y }]) => y)
    .value();
  return { X_MIN, X_MAX, Y_MIN, Y_MAX };
}

function getArea({ X_MIN, X_MAX, Y_MIN, Y_MAX }) {
  return Math.abs(X_MAX - X_MIN) * Math.abs(Y_MAX - Y_MIN);
}
