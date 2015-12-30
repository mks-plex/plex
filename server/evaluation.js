var Promise = require('bluebird');
var regression = require('regression');
var queries = require('./queries.js');
var utils = require('./utilities.js');
var child_process = require('child_process');
var fs = require('fs');


module.exports.evalAlg = function(userInput, dataType) {

  return new Promise(function(resolve, reject) {
    var results;

    var writeable = fs.createWriteStream('server/testInputBuffer.txt');
    writeable.on('finish', function () {
      console.log('**test input buffer file has been written');
    });
    writeable.write(userInput);
    writeable.end();

    /* TESTING readFile
    fs.readFile('server/testInputBuffer.txt', 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      console.log('READING FILE:', data);
    });
    */

    var child = child_process.spawn(process.execPath, ['server/syncTest.js'], {
      stdio: [null, null, null, 'pipe']
      // timeout: 500 // for sync version
    });

    // child.on('close', function(code, signal) {
    //   console.log('process ended, code:', code);
    //   console.log('signal:', signal);
    // })

    child.on('exit', function(code, signal) {
      console.log('child process exited due to ' + signal);
      console.log('code: ' + code);

      // if code/signal is due to timeout, return something else
    })

    child.stdio[3].on('data', function(data) {
      console.log('got a message from child: ' + data);
      results = JSON.parse(data);

      child.kill('SIGINT');

      resolve(results);
    })

    // child.stdout.pipe(process.stdout);

    // var child = child_process.execFile('server/syncTest.js', [data], {
    //   timeout: 4000
    //   // input: data
    //   // env: envDup
    //   // killSignal: 'Evaluation timed out'
    // }, function(error, stdout, stderr) {
    //   console.log('stdout: ' + stdout);
    //   console.log('stderr: ' + stderr);
    //   if (error !== null) {
    //     console.log('exec error: ' + error);
    //   }
    // });
  });
};


module.exports.getJSONCoords = function(data) {
  console.log('eval -getting json coordinates from eval data');

  // starting value initialize log scale graph
  var coords = [{x_axis: 10, y_axis: 0}];

  for (var i = 0; i < data.length; i++) {
    coords.push({x_axis: data[i][0], y_axis: data[i][1]});
  }

  return JSON.stringify(coords);
};


module.exports.runRegression = function(data, order) {
  order = order || '1';
  var result;
  var coef;
  var equation;

  /* TODO: use results of bigO to run the right type of regression
  switch statement for order/regression type
  2+ - power y = ax^b
  1 - linear y = ax + b
  ln - logarithmic y = a + b ln x ?? or use linear also
  default - linearThroughOrigin y = mx
  */

  switch (order) {
    case ('2+'): 
      result = regression('power', data);
      coef = result.equation;
      equation = 'y = ' + coef[0].toExponential(2) + ' x^' + coef[1].toFixed(2);
      break;
    case ('1'): 
      result = regression('linear', data);
      coef = result.equation;
      equation = 'y = ' + coef[0].toExponential(2) + 'x + ' + coef[1].toExponential(2);
      break;
    case ('ln'): 
      result = regression('logarithmic', data);
      coef = result.equation;
      equation = 'y = ' + coef[0].toExponential(2) + ' + ' + coef[1].toExponential(2) + 'ln(x)';
      break;
    default: 
      result = regression('linearThroughOrigin', data);
      coef = result.equation;
      equation = 'y = ' + coef[0].toExponential(2) + 'x';
  }

  console.log('Equation from regression: ' + equation);

  return equation;
};
