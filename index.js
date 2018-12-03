const get = require('./input');

const [, , , day, exercice] = process.argv;
const f = require(`./${day}/${exercice}`);

console.log('day', day);
console.log('exercice', exercice);
console.log('result', f(get(day)));
