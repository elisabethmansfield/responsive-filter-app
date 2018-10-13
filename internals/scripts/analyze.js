#!/usr/bin/env node

const shelljs = require('shelljs');
const animateProgress = require('./helpers/progress');
const progress = animateProgress('Generating stats');

// Generate stats.json file with webpack
shelljs.exec(
  'webpack --config internals/webpack/webpack.prod.babel.js --profile --json > stats.json',
);

// Called after webpack has finished generating the stats.json file
function callback() {
  clearInterval(progress);
  process.stdout.write(
    '\n\nOpen ' +'http://webpack.github.io/analyse/' +
      ' in your browser and upload the stats.json file!' +
     '\n(Tip: ' + 'CMD + double-click' + ' the link!\n\n'
  );
}
