const T = require('taninsam');

module.exports = function(input) {
  let firstFreq = 0;
  let firstFreqObj = {};
  let i = 0;

  try {
    while (true) {
      const resTmp = T.chain(input)
        .chain(
          T.reduce(
            ({ res, freq }, input) => {
              const tmp = input + res;
              if (freq[tmp]) {
                throw Error(tmp);
              }
              const acc = { res: tmp, freq };
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
};
