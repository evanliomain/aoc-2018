const T = require('taninsam');
const letterToNumber = x =>
  ({
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
  }[x]);

module.exports = function(input) {
  while (true) {
    const [head, ...tail] = input;
    const differential = diffs(head, tail);

    if (0 !== differential.length) {
      const [s1, s2] = differential[0].s;
      return T.chain(s1)
        .chain(T.split())
        .chain(T.reduce((res, c, i) => (c === s2[i] ? res + s1[i] : res), ''))
        .value();
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
    .chain(T.filter(({ d }) => d <= 1))
    .value();
}

function diff(a1, a2) {
  const [b1, b2] = [a1, a2].map(stringToArray);
  return T.chain(b1)
    .chain(T.map((c, i) => c - b2[i]))
    .chain(T.map(x => (x === 0 ? 0 : 1)))
    .chain(T.sum())
    .value();
}

function stringToArray(str) {
  return T.chain(str)
    .chain(T.split())
    .chain(T.map(letterToNumber))
    .value();
}
