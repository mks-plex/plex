var Promise = require('bluebird');
var regression = require('regression');
var queries = require('./queries.js');
var utils = require('./utilities.js');

module.exports.evalAlg = function(userInput, dataType) {
  var databaseSize = 10000;
  var avgCutoff = 500;
  var avgIterations = 3;
  var currentInputSize = 500;
  var stepFactor = 1.5;
  var result = [];
  var runtime;

  return new Promise(function(resolve, reject) {
    return queries.getData(dataType)
    .then(function(response) {
      var data = response[0].array;

      console.log('eval -data length is ' + data.length);

      while (currentInputSize < databaseSize) {
        if (currentInputSize <= avgCutoff) {
          runtime = utils.runTimeAverage(userInput, data.slice(0, currentInputSize), avgIterations);
        } else {
          runtime = utils.getRunTime(userInput, data.slice(0, currentInputSize));
        }
        result.push(runtime);
        currentInputSize *= stepFactor;
      }

      resolve(result);
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
  order = order || 'ln';
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
