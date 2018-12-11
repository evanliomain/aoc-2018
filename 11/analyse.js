const fs = require('fs');
const T = require('taninsam');
const { makeGridArray } = require('./utils');

const size = 5;
fs.writeFileSync(
  `../output/11-${size}.json`,
  JSON.stringify(makeGridArray(size))
);
