const T = require('taninsam');
const maxBy = require('../max-by');

module.exports = function({ planning, keys }) {
  for (let key of keys) {
    planning[key].sum = T.chain(planning[key].minutes)
      .chain(T.filter(isAsleep => isAsleep))
      .chain(T.sumBy(() => 1))
      .value();
  }

  const mapIds = {};
  for (let key of keys) {
    const id = planning[key].key.id;
    if (T.isUndefined(mapIds[id])) {
      mapIds[id] = 0;
    }
    mapIds[id] += planning[key].sum;
  }
  const maxId = T.chain(mapIds)
    .chain(T.entries())
    .chain(maxBy(([, s]) => s))
    .chain(([id]) => parseInt(id.substring(1), 10))
    .value();

  const planningMax = T.chain(planning)
    .chain(T.values())
    .chain(T.filter(({ key }) => key.id === '#' + maxId))
    .value();

  const minutesRes = T.arrayFromValue(60)(0);

  return T.chain(minutesRes)
    .chain(T.map((_, i) => T.sumBy(e => e.minutes[i])(planningMax)))
    .chain(
      T.reduce(
        (acc, e, i) => {
          if (acc.s < e) {
            return { m: i, s: e };
          }
          return acc;
        },
        { m: 0, s: 0 }
      )
    )
    .chain(({ m }) => m * maxId)
    .value();

  // To display planning
  // for (let key of keys) {
  //   planning[key].key = planning[key].key.date + ' ' + planning[key].key.id;
  //   planning[key].minutes = planning[key].minutes
  //     .map(isAsleep => (isAsleep ? '#' : '.'))
  //     .join('');
  // }

  return planningMax;
};
