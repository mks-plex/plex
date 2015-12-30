var regression = require('regression');
var queries = require('./queries.js');
var utils = require('./utilities.js');

var results = [];
var runtime;
var maxInputSize = 20000;
var avgCutoff = 5000;
var avgIterations = 3;
var step = 1000;

function timedTest(arr) {
  // var currentInputSize = 500;

  // iteratively test input sizes
  for(var i = start; i < Math.min(start + step, maxInputSize); i += step){
    runtime = utils.getRunTime(userInput, data.slice(0, i));
    results.push(runtime)
    continue;
  }

  // continue testing next inputs or stop
  if (i < maxInputSize && !timeout) {
    // yield to event loop
    setTimeout(function() {
      console.log('continuing timed test');
      timedTest(data, start + step);
    }, 0);
  } else if (timeout) {
    console.log('timeout completed BEFORE test, rejecting');
    console.log('error');
  }

  console.log(results);
}

timedTest(stdio)