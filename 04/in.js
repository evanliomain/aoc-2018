const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(x => x.split('] ')))
    .chain(T.map(([time, action]) => [time.substring(1), action]))
    .chain(
      T.map(([time, action]) => {
        const [date, hm] = time.split(' ');
        const [h, m] = hm.split(':');
        return {
          date,
          h,
          m,
          action
        };
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
        return {
          date,
          h,
          m,
          action: actionObj
        };
      })
    )
    .chain(T.sortBy(({ date, h, m }) => `${date} ${h}:${m}`))
    .chain(T.castTo({ m: parseInt }))
    .value();
};
