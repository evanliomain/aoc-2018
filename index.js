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
console.log(chalk.magenta('result:'), chalk.bold(f(pre(get(day, isSample)))));
