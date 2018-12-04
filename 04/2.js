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

function getId(date, h, id) {
  if ('00' === h) {
    return `${date} ${id}`;
  }
  if ('23' === h) {
    return T.chain(date)
      .chain(d => d.split('-'))
      .chain(([y, m, d]) => ({
        d: parseInt(d, 10),
        m: parseInt(m, 10),
        y: parseInt(y, 10)
      }))
      .chain(({ y, m, d }) => new Date(y, m - 1, d))
      .chain(d => addDays(d, 1))
      .chain(d => format(d, 'YYYY-MM-DD'))
      .chain(newDate => `${newDate} ${id}`)
      .value();
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
