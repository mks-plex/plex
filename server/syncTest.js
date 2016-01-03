var fs = require('fs');

process.on('message', function(msg) {
  fs.readFile(__dirname + '/algorithmBuffer.txt', function(err, alg) {
    if (err !== null) process.stdout.write('err');

    fs.readFile(__dirname + '/testInputBuffer.txt', 'utf8', function(err, data) {
      if (err !== null) {
        process.stdout.write('err');
      }

      var inputs = JSON.parse(data);
      var results = JSON.stringify(timedTest(alg, inputs));

      process.stdout.write(results);
    })
  })
});


function timedTest(userInput, data) {
  var currentInputSize = 100;
  var maxInputSize = 10100;
  var avgCutoff = 2100;
  var avgIterations = 3;
  var stepFactor = 1000;
  var result = [];
  var runtime;

  while (currentInputSize < maxInputSize) {
    if (currentInputSize <= avgCutoff) {
      runtime = runTimeAverage(userInput, data.slice(0, currentInputSize), avgIterations);
    } else {
      runtime = getRunTime(userInput, data.slice(0, currentInputSize));
    }

    result.push(runtime);
    currentInputSize += stepFactor;
  }

  return result;
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
};

var memoBuild = memoize(buildFunc);

function runTimeAverage(userInput, dbInput, iterations) {
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

  return [stats[0], Number(averageRun.toFixed(3))];
};

function getRunTime(userInput, dbInput) {
  var userAlg = memoBuild(userInput);

  var time = process.hrtime();
  var result = userAlg(dbInput);
  var diff = process.hrtime(time);
  var runTime = (diff[0] * 1e9 + diff[1]) / 1e6;

  return [dbInput.length, Number(runTime.toFixed(3))];
};


function buildFunc(userInput) {

  var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
  // var algString = userInput.slice(userInput.indexOf('{') + 1, userInput.lastIndexOf('}'));
  var name = getFuncName(userInput);
  var wrappedAlg = recursionFix(userInput, name, param);
  var userAlg = new Function(param, wrappedAlg);

  return userAlg;
}

function recursionFix(string, name, param) {

  var insertBefore = 'var alg=function(' + param + '){';
  var insertAfter = 'return ' + name + '(' + param + ');}; return alg(' + param + ')';

  return insertBefore + string + insertAfter;
}

function getFuncName(string) {
  var userInput = string.slice(0);

  var dStop = string.indexOf('=');
  var eStop = string.indexOf('(');
  var funcName;

  while (string[0] === ' ') {
    userInput = userInput.slice(1);
  }

  if (userInput.slice(0,3) == 'var') {
    if (userInput[--dStop] == ' ') {
      funcName = userInput.slice(4, dStop);
    } else {
      funcName = userInput.slice(4, ++dStop);
    }
  } 
  if (userInput.slice(0, 8) == 'function') {
    if (userInput[--eStop] == ' ') {
      funcName = userInput.slice(9, eStop);
    } else {
      funcName = userInput.slice(9, ++eStop);
    }
  }

  return funcName;
}
