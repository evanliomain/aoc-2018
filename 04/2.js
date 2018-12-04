const T = require('taninsam');
const maxBy = require('../max-by');

module.exports = function({ planning, keys }) {
  const minutesRes = Array.from({ length: 60 }, () => new Object());

  for (let key of keys) {
    const id = planning[key].key.id;
    if (T.isUndefined(minutesRes[0][id])) {
      for (let i = 0; i < 60; i++) {
        minutesRes[i][id] = 0;
      }
    }

    for (let i = 0; i < 60; i++) {
      if (planning[key].minutes[i]) {
        minutesRes[i][id] += 1;
      }
    }
  }

  return T.chain(minutesRes)
    .chain(T.map(T.entries()))
    .chain(T.map((values, i) => values.map(([id, sum]) => ({ id, sum, i }))))
    .chain(T.map(maxBy(x => x.sum)))
    .chain(maxBy(x => x.sum))
    .chain(({ id, i }) => i * parseInt(id.substring(1), 10))
    .value();

  // To display planning
  for (let key of keys) {
    planning[key].key = planning[key].key.date + ' ' + planning[key].key.id;
    planning[key].minutes = planning[key].minutes
      .map(isAsleep => (isAsleep ? '#' : '.'))
      .join('');
  }

  return planning;
};
