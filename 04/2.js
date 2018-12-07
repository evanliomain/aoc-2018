const T = require('taninsam');

const minutesOfHour = Array.from({ length: 60 }, (_, i) => i);

module.exports = function({ planning, keys }) {
  return T.chain(makeMinutesMap(planning, keys))
    .chain(T.map(T.entries()))
    .chain(T.map((values, i) => values.map(([id, sum]) => ({ id, sum, i }))))
    .chain(T.map(T.maxBy(({ sum }) => sum)))
    .chain(T.maxBy(({ sum }) => sum))
    .chain(({ id, i }) => i * id)
    .value();
};

function makeMinutesMap(planning, keys) {
  const minutesRes = Array.from({ length: 60 }, () => new Object());

  for (let key of keys) {
    const id = parseInt(planning[key].key.id.substring(1), 10);
    if (T.isUndefined(minutesRes[0][id])) {
      minutesOfHour.forEach(i => (minutesRes[i][id] = 0));
    }

    minutesOfHour.forEach(i => {
      if (planning[key].minutes[i]) {
        minutesRes[i][id] += 1;
      }
    });
  }

  return minutesRes;
}
