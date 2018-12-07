const T = require('taninsam');
const addDays = require('date-fns/add_days');
const format = require('date-fns/format');

module.exports = function(input) {
  const newInput = T.chain(input)
    .chain(T.map(T.split('] ')))
    .chain(T.map(([time, action]) => [time.substring(1), action]))
    .chain(
      T.map(([time, action]) => {
        const [date, hm] = time.split(' ');
        const [h, m] = hm.split(':');
        return { date, h, m, action };
      })
    )
    .chain(
      T.map(({ date, h, m, action }) => {
        const [first, id] = action.split(' ');
        const actionObj = {};
        if ('falls' === first) {
          actionObj.fallsAsleep = true;
        }
        if ('wakes' === first) {
          actionObj.wakesUp = true;
        }
        if ('Guard' === first) {
          actionObj.guardShift = id;
        }
        return { date, h, m, action: actionObj };
      })
    )
    .chain(T.sortBy(({ date, h, m }) => `${date} ${h}:${m}`))
    .chain(T.castTo({ m: parseInt }))
    .value();

  const planning = {};
  let keys = [];
  let currId;

  for (const val of newInput) {
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

  return { planning, keys };
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
