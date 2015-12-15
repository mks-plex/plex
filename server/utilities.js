var Promise = require('bluebird');
var queries = require('./queries.js');
var memoBuild = memoize(buildFunc);

module.exports.evalAlg = function(userInput, dataType) {
  var avgCutoff = 1000;
  var avgIterations = 3;
  var currentInputSize = 500;
  var stepFactor = 1.2;
  var result = [];
  var runtime;

  return new Promise(function(resolve, reject) {
    return queries.getData(dataType)
    .then(function(response) {
      var data = response[0].array;

      console.log('U18-data length is ' + data.length);

      while (currentInputSize < 10000) {
        if (currentInputSize <= avgCutoff) {
          runtime = runTimeAverage(userInput, data.slice(0, currentInputSize), avgIterations);
        } else {
          runtime = getRunTime(userInput, data.slice(0, currentInputSize));
        }
        result.push(runtime);
        currentInputSize *= stepFactor;
      }

      resolve(result);
    });
  });
}; 

module.exports.getJSONCoords = function(data) {
  console.log('U36-getting json coordinates from eval data');

  var coords = [];
  
  for (var i = 0; i < data.length; i++) {
    coords.push({x_axis: data[i][0], y_axis: data[i][1]});
  }

  return JSON.stringify(coords);
};

function runTimeAverage(userInput, dbInput, iterations) {
  console.log('U48-calculating runtime average for N = ' + dbInput.length);

  var total = 0;
  var i = 0;
  var averageRun;
  var stats;

  while (i < iterations) {
    stats = getRunTime(userInput, dbInput);
    total += stats[1];
    i++;
  }

  averageRun = total / iterations;

  // returns [input size N, average runtime in milliseconds]
  return [stats[0], Number(averageRun.toFixed(3))];
}

function getRunTime(userInput, dbInput) {
  var userAlg = memoBuild(userInput);
  // var userAlg = buildFunc(userInput);
  var time = process.hrtime();
  var result = userAlg(dbInput);
  var diff = process.hrtime(time);
  var runTime = (diff[0] * 1e9 + diff[1]) / 1e6;

  console.log('U75- single runtime for N = ' + dbInput.length + ', run: ' + runTime);
  // returns [N, runtime in milliseconds]
  return [dbInput.length, Number(runTime.toFixed(3))];
}

function buildFunc(userInput) {
  console.log('U116-building function');
  var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
  console.log('U99-param is ' + param);
  var algName = getFuncName(userInput);
  var algString = userInput.slice(userInput.indexOf('{') + 1, userInput.lastIndexOf('}'));
  var userAlg = new Function(param, algString);

  console.log('U88-created ' + algName + ' algorithm with user input');

  return userAlg;
}

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

function memoize(func) {
  var cached = {};

  return function() {
    var args = Array.prototype.slice.call(arguments);
    if (!cached[args]) {
      cached[args] = func.apply(this, arguments);
    }

    return cached[args];
  };
}
