const T = require('taninsam');
const get = require('./input');
const chalk = require('chalk');

const [, , , day, exercice, sample] = process.argv;

let isSample = undefined !== sample;
let isSampleNumber = false;
if (isSample && !isNaN(parseInt(sample, 10))) {
  isSample = parseInt(sample, 10);
  isSampleNumber = true;
}

// Get solve function
const solve = require(`./${day}/${exercice}`);

// Get input parser
let parser;
try {
  parser = require(`./${day}/in`);
} catch (e) {
  parser = x => x;
}

// Log user arguments
console.log(
  [
    chalk.green(`day:`, chalk.bold(day)),
    chalk.blue(`exercice:`, chalk.bold(exercice)),
    (isSample ? chalk.red('sample data') : '') +
      (isSampleNumber ? ' ' + chalk.bold.red(isSample) : '')
  ]
    .filter(x => '' !== x)
    .join(' - ')
);

// Get the input
let input;
try {
  input = get(day, isSample);
} catch (e) {
  console.log(chalk.bold.red(e.message));
  return;
}

console.time('solving in');
const result = solve(parser(input));
console.timeEnd('solving in');

if (typeof result === 'object') {
  console.log(
    chalk.magenta('result:') + '\n' + JSON.stringify(result, (_, v) => v, 2)
  );
} else {
  console.log(chalk.magenta('result:') + '\n' + result);
}
