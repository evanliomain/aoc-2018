const get = require('./input');

const [, , , day, exercice, sample] = process.argv;

const isSample = undefined !== sample;

const f = require(`./${day}/${exercice}`);

let pre;
try {
  pre = require(`./${day}/in`);
} catch (e) {
  pre = x => x;
}

console.log(
  `day: ${day} - exercice: ${exercice}` + (isSample ? ' - sample data' : '')
);
console.log('result:', f(pre(get(day, isSample))));
