const T = require('taninsam');

module.exports = function(input) {
  let firstFreq = 0;
  let firstFreqObj = {};
  let i = 0;

  try {
    for (; i < 10000; i++) {
      const resTmp = T.chain(input)
        .chain(T.map(x => parseInt(x, 10)))
        .chain(T.filter(x => !isNaN(x)))
        .chain(
          T.reduce(
            ({ res, freq }, input) => {
              const tmp = input + res;
              if (freq[tmp]) {
                throw Error('Found ' + tmp + ' in ' + i + ' laps');
              }
              const acc = {
                res: tmp,
                freq
              };
              acc.freq[tmp] = true;
              return acc;
            },
            { res: firstFreq, freq: firstFreqObj }
          )
        )
        .value();
      firstFreq = resTmp.res;
      firstFreqObj = resTmp.freq;
    }
  } catch (e) {
    return e.message;
  }
  return 'Nothing found until';
};
