var fs = require('fs');

// var readFiles = function() {

//   fs.readFile(__dirname + '/algorithmBuffer.txt', 'utf8', function(err, data) {
//     if (err !== null) {
//       process.stdout('err reading algo: ' + err);
//     }
//     userInput = JSON.parse(data);
//     process.stdout.write('~~~got algorithm~~~'  + userInput);
//   })

//   fs.readFile(__dirname + '/testInputBuffer.txt', 'utf8', function(err, data) {
//     if (err !== null) {
//       process.stdout('err reading inputs: ' + err);
//     }
//     testInputs = JSON.parse(data);
//     process.stdout.write('~~~got inputs~~~' + testInputs.length);
//     //   call timedTest and write results or use interval to poll a results
//     //   var results = JSON.stringify(timedTest(userInput, data)); 
//   })
// };


process.on('message', function(msg) {
  
  // readFiles();

  fs.readFile(__dirname + '/algorithmBuffer.txt', function(err, data) {
    if (err !== null) process.stdout.write('err');

    // process.stdout.write(data);
    // userInput = data;

    fs.readFile(__dirname + '/testInputBuffer.txt', 'utf8', function(err, data2) {
      if (err !== null) {
        process.stdout.write('err');
      }
      var alg = data;
      var inputs = JSON.parse(data2);

      // process.stdout.write('got alg');
      // process.stdout.write('got inputs length: ' + inputs.length);

      var results = JSON.stringify(timedTest(alg, inputs));

      process.stdout.write(results);
    })
  })
})

// poll to see if timed test is done
// setInterval(function() {
//   if (results !== null) {
//     process.stdout.write(results);
//   }
// }, 500);

function timedTest(userInput, data) {
  var currentInputSize = 100;
  var maxInputSize = 20000;
  var avgCutoff = 500;
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

  // returns [input size N, average runtime in milliseconds]
  return [stats[0], Number(averageRun.toFixed(3))];
};

function getRunTime(userInput, dbInput) {
  var userAlg = memoBuild(userInput);

  var time = process.hrtime();
  var result = userAlg(dbInput);
  var diff = process.hrtime(time);
  var runTime = (diff[0] * 1e9 + diff[1]) / 1e6;

  // returns [N, runtime in milliseconds]
  return [dbInput.length, Number(runTime.toFixed(3))];
};


function buildFunc(userInput) {
  // process.stdout.write('building func')

  var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
  var algString = userInput.slice(userInput.indexOf('{') + 1, userInput.lastIndexOf('}'));
  var name = getFuncName(userInput);
  var wrappedAlg = recursionFix(userInput, name, param);
  var userAlg = new Function(param, wrappedAlg);

  return userAlg;
}

function recursionFix(string, name, param) {
  // process.stdout.write('recursionfix called for ' + name);

  var insertBefore = 'var alg=function(' + param + '){';
  var insertAfter = 'return ' + name + '(' + param + ');}; return alg(' + param + ')';

  return insertBefore + string + insertAfter;
}

function getFuncName(string) {
  // process.stdout.write('getting func name');
  var userInput = string.slice(0);

  var dStop = string.indexOf('=');
  var eStop = string.indexOf('(');
  var funcName;

  // trim leading white space
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
