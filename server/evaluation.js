var Promise = require('bluebird');
var regression = require('regression');
var queries = require('./queries.js');
var utils = require('./utilities.js');
var results = [];
var runtime;

module.exports.evalAlg = function(userInput, dataType) {

  return new Promise(function(resolve, reject) {
    return queries.getData(dataType)
    .then(function(response) {
      var data = response[0].array;
      var timeout = false;

      console.log('data length is ' + data.length);

      function timedTest(arr, start){
        var maxInputSize = 20000;
        var avgCutoff = 5000;
        var avgIterations = 3;
        var step = 1000;
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
      
      // main timer
      setTimeout(function() {
        console.log('timeout completed')
        timeout = true;
      }, 5000);

      // var results = timedTest(data, 100);

      // console.log('testing finished, resolving results');

      resolve(timedTest(data, 100));

      // while (currentInputSize < maxInputSize) {
      //   if (currentInputSize <= avgCutoff) {
      //     runtime = utils.runTimeAverage(userInput, data.slice(0, currentInputSize), avgIterations);
      //   } else {
      //     runtime = utils.getRunTime(userInput, data.slice(0, currentInputSize));
      //   }
      //   result.push(runtime);
      //   currentInputSize *= stepFactor;
      // }

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
