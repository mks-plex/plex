var queries = require('./queries.js');

module.exports.evalAlg = function(userInput, dataType) {
  // TODO: add queries file, get data inputs from database, save in respective variables
  var data = queries.getData(dataType);

  /* 
  powX represents tests for data size Math.pow(10, X) e.g. 10^3 for 1,000
  skip pow1 because results not accurate for input size < 100
  */
  var pow2 = runTimeAverage(userInput, data[0], 8);
  var pow3 = runTimeAverage(userInput, data[1], 6);
  var pow4 = runTimeAverage(userInput, data[2], 3);
  var pow5 = getRunTime(userInput, data[3]);
  var pow6 = getRunTime(userInput, data[4]);
  // var pow7 = getRunTime(userInput, data[5]);

  return [pow2, pow3, pow4, pow5, pow6];
}

module.exports.getCoords = function(data) {
  var coords = [];
  for (var i = 0; i < data.length; i++) {
    coords.push([data[i][1], data[i][0]]);
  }

  // returns array of [runTime, N] for each input size
  return coords;
}

function runTimeAverage(userInput, dbInput, iterations) {
  var total = 0;
  var i = 0;
  var averageRun;
  var result;
  while (i < iterations) {
    var stats = getRunTime(userInput, dbInput);
    total += stats[0];
    i++;
  }
  averageRun = total / iterations;

  // returns [avgRunTime, N, result, iterations]
  return [Number(averageRun.toFixed(3)), stats[1], stats[2], iterations];
}

function getRunTime(userInput, dbInput) {
  var userAlg = buildFunc(userInput);
  var time = process.hrtime();
  var result = userAlg(dbInput);
  var diff = process.hrtime(time);
  var runTime = (diff[0] * 1e9 + diff[1]) / 1e6;

  // returns [runtime in milliseconds, input size N, [result if N = 100]]
  if (dbInput.length <= 100) {
    return [Number(runTime.toFixed(3)), dbInput.length, result];
  } else {
    return [Number(runTime.toFixed(3)), dbInput.length];
  }
}

function buildFunc(userInput) {
  var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
  var algString = userInput.slice(userInput.indexOf('{') + 1, userInput.lastIndexOf('}'));
  var userAlg = new Function(param, algString);

  return userAlg;
}

// TODO: transfer this to be method on codemirror class
function getFuncName(string) {
  var dStop = string.indexOf('=');
  var eStop = string.indexOf('(');
  var funcName;
  if (string.substr(0,3) === 'var') {
    if (string[--dStop] === ' ') {
      funcName = string.slice(4, dStop);
    } else {
      funcName = string.slice(4, ++dStop);
    }
  } else if (string.substr(0, 8) === 'function') {
    if (string[--eStop] === ' ') {
      funcName = string.slice(9, eStop);
    } else {
      funcName = string.slice(9, ++eStop);
    }
  } else {
      alert ('Please use a function expression or declaration\ne.g. `var myFunc = ...` or `function myFunc()...`');
  }

  return funcName;
}





