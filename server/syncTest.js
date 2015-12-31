var fs = require('fs');

var userInput;
var testInputs;

var readFiles = function() {
  process.stdout.write('simulated results');

  fs.readFile('server/algorithmBuffer.txt', 'utf8', function(err, data) {
    if (err) {
      process.stdout('err: ' + err);
    }
    userInput = JSON.parse(data);
    process.stdout.write('got alg');
  });

  fs.readFile('./testInputBuffer.txt', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    testInputs = JSON.parse(data);
    process.stdout.write('got inputs');
    //   call timedTest and write results or use interval to poll a results
    //   var results = JSON.stringify(timedTest(userInput, data)); 
  });
};





process.on('message', function(msg) {
  process.stdout.write('GOT THE MESSAGE');
  // readFiles();

  fs.readFile('/server/algorithmBuffer.txt', function(err, data) {
    if (err) process.stdout.write('err, ', err);

    process.stdout.write(data);
  })

})




// poll to see if timed test is done
// setInterval(function() {
//   if (results !== null) {
//     process.stdout.write(results);
//   }
// }, 500);

// process.stdout.write(userInput);













// function timedTest(userInput, data) {
//   var currentInputSize = 100;
//   var maxInputSize = 20000;
//   var avgCutoff = 500;
//   var avgIterations = 3;
//   var currentInputSize = 100;
//   var stepFactor = 1000;
//   var result = [];
//   var runtime;

//   while (currentInputSize < maxInputSize) {
//     if (currentInputSize <= avgCutoff) {
//       runtime = utils.runTimeAverage(userInput, data.slice(0, currentInputSize), avgIterations);
//     } else {
//       runtime = utils.getRunTime(userInput, data.slice(0, currentInputSize));
//     }

//     result.push(runtime);

//     currentInputSize += stepFactor;
//   }

//   console.log('results of child', results);

//   return result;
// }


// var memoBuild = module.exports.memoBuild = memoize(buildFunc);

// function runTimeAverage(userInput, dbInput, iterations) {
//   console.log('calculating runtime average for N = ' + dbInput.length);

//   var total = 0;
//   var i = 0;
//   var averageRun;
//   var stats;

//   while (i < iterations) {
//     stats = getRunTime(userInput, dbInput);
//     total += stats[1];
//     i++;
//   }

//   averageRun = total / iterations;

//   // returns [input size N, average runtime in milliseconds]
//   return [stats[0], Number(averageRun.toFixed(3))];
// };

// function getRunTime(userInput, dbInput) {
//   var userAlg = memoBuild(userInput);

//   var time = process.hrtime();
//   var result = userAlg(dbInput);
//   var diff = process.hrtime(time);
//   var runTime = (diff[0] * 1e9 + diff[1]) / 1e6;

//   // console.log('single runtime for N = ' + dbInput.length + ', run: ' + runTime);

//   // returns [N, runtime in milliseconds]
//   return [dbInput.length, Number(runTime.toFixed(3))];
// };

// function buildFunc(userInput) {
//   console.log('building function');
//   var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
//   var algName = getFuncName(userInput);
//   var algString = userInput.slice(userInput.indexOf('{') + 1, userInput.lastIndexOf('}'));
//   var wrappedAlg = recursionFix(userInput, algName, param);
//   var userAlg = new Function(param, wrappedAlg);

//   // console.log('created ' + algName + ' algorithm');
//   // console.log(userAlg.toString());

//   return userAlg;
// }

// function recursionFix(string, name, param) {
//   var insertBefore = 'var alg=function(' + param + '){';
//   var insertAfter = 'return ' + name + '(' + param + ');}; return alg(' + param + ')';

//   return insertBefore + string + insertAfter;
// }

// function getFuncName(string) {
//   var dStop = string.indexOf('=');
//   var eStop = string.indexOf('(');
//   var funcName;

//   if (string.substr(0,3) === 'var') {
//     if (string[--dStop] === ' ') {
//       funcName = string.slice(4, dStop);
//     } else {
//       funcName = string.slice(4, ++dStop);
//     }
//   } else if (string.substr(0, 8) === 'function') {
//     if (string[--eStop] === ' ') {
//       funcName = string.slice(9, eStop);
//     } else {
//       funcName = string.slice(9, ++eStop);
//     }
//   } else {
//     return null;
//   }

//   return funcName;
// }

