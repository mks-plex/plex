var Promise = require('bluebird');
var queries = require('./queries.js');
var memoBuild = memoize(buildFunc);

module.exports.evalAlg = function(userInput, dataType) {
  console.log('U6-evaluating algorithm with server data');

  return new Promise(function(resolve, reject) {
    return queries.getData(dataType)
    .then(function(stuff) {
      var data = stuff[0].array;
      var currentInputSize = 500;
      var result = [];

      console.log('U13-data length is ' + data.length);

      while (currentInputSize < data.length) {
        var runtime = getRunTime(userInput, data.slice(0, currentInputSize));
        result.push(runtime);
        currentInputSize += 1000;
      }

      resolve(result);
    });
  });
}; 

module.exports.getJSONCoords = function(data) {
  // return new Promise(function(resolve, reject) {
  console.log('U24-getting d3-readable coordinates from eval data');
  var coords = [];
  
  for (var i = 0; i < data.length; i++) {
    if (data[i][3] && data[i][4]) {
      coords.push({x_axis: data[i][0], y_axis: data[i][1], worst: data[i][2], best: data[i][3]});
    } else {
      coords.push({x_axis: data[i][0], y_axis: data[i][1]});
    }
  }
  
  return JSON.stringify(coords);
};

function runTimeAverage(userInput, dbInput, iterations) {
  console.log('U34-calculating runtime average for N = ' + dbInput.length);

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

  // TODO: include worst and best case : Math.max(times), Math.min(times) & for getRunTime
  // returns [input size N, average runtime in milliseconds, worst, best]
  return [stats[0], Number(averageRun.toFixed(3))];
}

function getRunTime(userInput, dbInput) {
  var userAlg = memoBuild(userInput);
  // var userAlg = buildFunc(userInput);
  var time = process.hrtime();
  var result = userAlg(dbInput);
  var diff = process.hrtime(time);
  var runTime = (diff[0] * 1e9 + diff[1]) / 1e6;

  console.log('U51- single runtime for N = ' + dbInput.length + ', run: ' + runTime);
  // returns [N, runtime in milliseconds]
  return [dbInput.length, Number(runTime.toFixed(3))];
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

function buildFunc(userInput) {
  console.log('U116- building function');
  var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
  console.log('param is ' + param);
  var algName = getFuncName(userInput);
  console.log('algname is ' + algName);
  var algString = userInput.slice(userInput.indexOf('{') + 1, userInput.lastIndexOf('}'));
  var userAlg = new Function(param, algString);

  console.log('U122-created ' + algName + ' algorithm with user input');

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
