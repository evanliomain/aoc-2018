const inputs = require("./second.input");
const T = require("taninsam");

let firstFreq = 0;
let firstFreqObj = {};
let i = 0;

for (; i < 10000; i++) {
  const resTmp = T.chain(inputs)
    .chain(
      T.reduce(
        ({ res, freq }, input) => {
          const tmp = input + res;
          if (freq[tmp]) {
            throw Error("Found "+ tmp+" in "+i+" laps");
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

console.log("Nothing found until");
