const get = require('./input');

const [, , , day, exercice] = process.argv;
const f = require(`./${day}/${exercice}`);

let pre;
try {
  pre = require(`./${day}/in`);
} catch (e) {
  pre = x => x;
}

console.log('day', day);
console.log('exercice', exercice);
console.log('result', f(pre(get(day))));
