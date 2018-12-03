const T = require('taninsam');
const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26
};

module.exports = function(input) {
  while (true) {
    const [head, ...tail] = input;
    const differential = diffs(head, tail);

    if (0 !== differential.length) {
      const [s1, s2] = differential[0].s;
      let res = '';
      for (let i = 0; i < s1.length; i++) {
        if (s1[i] === s2[i]) {
          res += s1[i];
        }
      }
      return res;
    }
    if (0 === tail.length) {
      return 'Nothing found';
    }
    input = tail;
  }
};

function diffs(str1, strs) {
  return T.chain(strs)
    .chain(T.map(str => ({ d: diff(str1, str), s: [str1, str] })))
    .chain(T.filter(r => r.d <= 1))
    .value();
}

function diff(a1, a2) {
  const b1 = stringToArray(a1);
  const b2 = stringToArray(a2);
  let diffArray = [];
  for (let i = 0; i < b1.length; i++) {
    diffArray.push(b1[i] - b2[i]);
  }

  return T.chain(diffArray)
    .chain(T.map(x => (x === 0 ? 0 : 1)))
    .chain(T.sumBy(x => x))
    .value();
}

function stringToArray(str) {
  let res = [];
  for (let i = 0; i < str.length; i++) {
    res.push(letterToNumber[str[i]]);
  }
  return res;
}
