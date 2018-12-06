const T = require('taninsam');
const { getCartePosition } = require('./utils');

module.exports = function({ points, carte, X_MAX, Y_MAX }) {
  // Initiate point on the carte
  points.forEach(point => {
    const id = getCartePosition(point);
    carte[id].isTake = true;
    carte[id].point = point.id;
    carte[id].distance = 0;
  });

  let iteratePoints = points.slice();
  let d = 1;

  // Spread each point in the space to determine which zone own to who
  for (let i = 0; i <= Math.max(X_MAX, Y_MAX); i++) {
    iteratePoints.forEach(point => {
      const idUp = getCartePosition(up(point));
      const idRight = getCartePosition(right(point));
      const idBottom = getCartePosition(bottom(point));
      const idLeft = getCartePosition(left(point));
      updateCarte(idUp, point);
      updateCarte(idRight, point);
      updateCarte(idBottom, point);
      updateCarte(idLeft, point);
    });
    iteratePoints = T.chain(carte)
      .chain(T.values())
      .chain(T.filter(p => p.isTake))
      .chain(T.filter(p => p.distance === d))
      .chain(T.map(p => ({ id: p.point, x: p.x, y: p.y })))
      .value();
    d++;
  }

  // Remove points from rectangle size
  for (let i = 0; i <= X_MAX; i++) {
    const point = carte[getCartePosition({ x: i, y: 0 })];
    if (!point.isTake) {
      continue;
    }
    if (point.point === -1) {
      continue;
    }
    points[point.point].isFinite = false;
  }
  for (let i = 0; i <= X_MAX; i++) {
    const point = carte[getCartePosition({ x: i, y: Y_MAX })];
    if (!point.isTake) {
      continue;
    }
    if (point.point === -1) {
      continue;
    }
    points[point.point].isFinite = false;
  }
  for (let i = 0; i <= Y_MAX; i++) {
    const point = carte[getCartePosition({ x: 0, y: i })];
    if (!point.isTake) {
      continue;
    }
    if (point.point === -1) {
      continue;
    }
    points[point.point].isFinite = false;
  }
  for (let i = 0; i <= Y_MAX; i++) {
    const point = carte[getCartePosition({ x: X_MAX, y: i })];
    if (!point.isTake) {
      continue;
    }
    if (point.point === -1) {
      continue;
    }
    points[point.point].isFinite = false;
  }

  // Get area of remain points and extract the max
  return T.chain(points)
    .chain(T.filter(point => point.isFinite))
    .chain(T.map(point => ({ ...point, area: computeArea(point.id) })))
    .chain(T.map(p => p.area))
    .chain(T.max())
    .value();

  function computeArea(id) {
    return T.chain(carte)
      .chain(T.values())
      .chain(T.filter(p => p.point === id))
      .chain(x => x.length)
      .value();
  }

  function updateCarte(id, point) {
    if (!carte[id].isTake) {
      carte[id].isTake = true;
      carte[id].point = point.id;
      carte[id].distance = d;
      return;
    }
    if (carte[id].point !== point.id && carte[id].distance === d) {
      carte[id].point = -1;
      carte[id].distance = -1;
      return;
    }
    if (d < carte[id].distance) {
      carte[id].point = point.id;
      carte[id].distance = d;
      return;
    }
  }

  function up({ x, y }) {
    return toRealPoint({ x, y: y - 1 });
  }
  function right({ x, y }) {
    return toRealPoint({ x: x + 1, y });
  }
  function bottom({ x, y }) {
    return toRealPoint({ x, y: y + 1 });
  }
  function left({ x, y }) {
    return toRealPoint({ x: x - 1, y });
  }

  function toRealPoint({ x, y }) {
    return {
      x: Math.min(X_MAX, Math.max(0, x)),
      y: Math.min(Y_MAX, Math.max(0, y))
    };
  }
};
