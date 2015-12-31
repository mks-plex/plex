var Promise = require('bluebird');
var regression = require('regression');
var queries = require('./queries.js');
var utils = require('./utilities.js');
var child_process = require('child_process');
var fs = require('fs');

(function() {
    var child_process = require("child_process");
    var oldSpawn = child_process.fork;
    function mySpawn() {
        console.log('spawn called with args:');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    child_process.fork = mySpawn;
})();

var pwd = process.cwd();

module.exports.evalAlg = function(userInput, dataType) {

  return new Promise(function(resolve, reject) {
    return queries.getData(dataType)
    .then(function(response) {
      var inputs = response[0].array;
      var results;
      var wroteOther = false;

      console.log('got test inputs length ' + inputs.length);

      // var child = child_process.spawn(process.execPath, ['server/syncTest.js']);
      var child = child_process.fork(__dirname + '/syncTest.js', {silent: true, cwd: pwd});
      
      child.stdout.on('data', function(data) {
        console.log('got a message from child: ' + data);
        // results = JSON.parse(data);
        // resolve(results);
      })


      // WRITING userInput to file async
      fs.writeFile('server/algorithmBuffer.txt', userInput, function(err) {
        if (err) throw err;
        console.log('ASYNC WRITE FILE SUCCESS for algorithm');

        if (wroteOther) {
          child.send('wrote');
        }
        wroteOther = true;
      })

      // WRITING inputs to file async
      fs.writeFile('server/testInputBuffer.txt', inputs, function(err) {
        if (err) throw err;
        console.log('ASYNC WRITE FILE SUCCESS for inputs');

        if (wroteOther) {
          child.send('wrote');
        }
        wroteOther = true;
      })
      
      // WRITING files sync
      // fs.writeFileSync('server/algorithmBuffer.txt', userInput);
      // fs.writeFileSync('server/testInputBuffer.txt', inputs);



      // setTimeout(function () {
        // child.kill('SIGINT');
      // }, 3000);


      // child.stdout.pipe(process.stdout);



      // var returned = child_process.execFileSync('./syncTest.js', null, { 
      //   encoding: 'utf8',
      //   timeout: 5000,
      //   maxBuffer: 200*1024,
      //   killSignal: 'SIGTERM',
      //   cwd: null,
      //   env: null 
      // });
       // function(error, stdout, stderr) {
       //    if (error !== null) throw error;
       //    console.log('stdout:', stdout);
       //    console.log('stderr:', stderr);
       //    resolve(stdout);
       //  }
      // );
      



      // TESTING readFile
      // fs.readFile('server/testInputBuffer.txt', 'utf8', function(err, data) {
      //   if (err) {
      //     throw err;
      //   }
      //   console.log('*READING FILE:', data.toString());
      // });

      // var parentwd = process.cwd();
      // console.log('parent wd:', parentwd);




    // ONLY if using the modifiod stdio version of child
    // child.on('exit', function(code, signal) {
    //   console.log('child process exited due to ' + signal);
    //   console.log('code: ' + code);

    //   // if code/signal is due to timeout, return something else
    // })



    });
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
