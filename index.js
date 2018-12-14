const get = require('./input');
const chalk = require('chalk');

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
  [
    chalk.green(`day:`, chalk.bold(day)),
    chalk.blue(`exercice:`, chalk.bold(exercice)),
    isSample ? chalk.red('sample data') : ''
  ]
    .filter(x => '' !== x)
    .join(' - ')
);
console.time('solving in');
const result = f(pre(get(day, isSample)));
console.timeEnd('solving in');

if (typeof result === 'object') {
  console.log(
    chalk.magenta('result:'),
    chalk.bold(JSON.stringify(result, (_, v) => v, 2))
  );
} else {
  console.log(chalk.magenta('result:'), chalk.bold(result));
}
