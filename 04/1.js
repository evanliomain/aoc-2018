const T = require('taninsam');
const addDays = require('date-fns/add_days');
const format = require('date-fns/format');

// input
// {
//   date: '1518-11-01',
//   h: '00',
//   m: 0,
//   action: {
//     guardShift: '#10'
//     fallsAsleep: true
//     wakesUp: true
//   }
// }[]

module.exports = function(input) {
  const planning = {};
  let keys = [];
  let currId;

  for (const val of input) {
    if (!T.isUndefined(val.action.guardShift)) {
      const key = { date: val.date, id: val.action.guardShift };
      const keyStr = getId(val.date, val.h, key.id);
      currId = key.id;
      if (T.isUndefined(planning[keyStr])) {
        keys.push(keyStr);
        planning[keyStr] = {
          key,
          minutes: T.arrayFromValue(60)(false)
        };
      }
    }

    if (
      !T.isUndefined(val.action.fallsAsleep) ||
      !T.isUndefined(val.action.wakesUp)
    ) {
      const keyStr = getId(val.date, val.h, currId);
      // console.log(keyStr, val.m);
      planning[keyStr].minutes[val.m] = true;
    }
  }
  for (let key of keys) {
    let cursor = planning[key].minutes[0];
    for (let i = 1; i < planning[key].minutes.length; i++) {
      if (!cursor) {
        if (planning[key].minutes[i]) {
          cursor = true;
        } else {
          // Nothing
        }
      } else {
        if (planning[key].minutes[i]) {
          planning[key].minutes[i] = false;
          cursor = false;
        } else {
          planning[key].minutes[i] = true;
        }
      }
    }
  }

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

function getId(date, h, id) {
  if ('00' === h) {
    return `${date} ${id}`;
  }
  if ('23' === h) {
    const [y, m, d] = date.split('-');
    let dn = parseInt(d, 10);
    let mn = parseInt(m, 10);
    let yn = parseInt(y, 10);

    const newDate = format(addDays(new Date(yn, mn - 1, dn), 1), 'YYYY-MM-DD');
    return `${newDate} ${id}`;
  }
}

// Return first max items
function maxBy(f) {
  return arr => {
    if (0 === arr.length) {
      return undefined;
    }
    if (1 === arr.length) {
      return arr[0];
    }
    const [head, ...tail] = arr;
    return tail.reduce(
      (acc, element) => (f(element) <= f(acc) ? acc : element),
      head
    );
  };
}
