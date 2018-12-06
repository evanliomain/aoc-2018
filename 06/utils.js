module.exports = {
  getCartePosition: ({ x, y }) => `${x},${y}`,
  distance: p1 => p2 => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
};
