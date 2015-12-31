var Promise = require('bluebird');
var regression = require('regression');
var queries = require('./queries.js');
var utils = require('./utilities.js');

module.exports.evalAlg = function(userInput, dataType) {
  var maxInputSize = 10100;
  var avgCutoff = 2100;
  var avgIterations = 3;
  var currentInputSize = 100;
  var stepFactor = 1000;
  var result = [];
  var runtime;

  return new Promise(function(resolve, reject) {
    return queries.getData(dataType)
    .then(function(response) {
      var data = response[0].array;

      console.log(data.length + ' test inputs received');

      while (currentInputSize < maxInputSize) {
        if (currentInputSize <= avgCutoff) {
          runtime = utils.runTimeAverage(userInput, data.slice(0, currentInputSize), avgIterations);
        } else {
          runtime = utils.getRunTime(userInput, data.slice(0, currentInputSize));
        }
        result.push(runtime);
        currentInputSize += stepFactor;
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
  order = order || 'O(n)';

  var result;
  var coef;
  var equation;

  console.log('big o is ' + order);

  switch (order) {
    case ('O(n<sup>2</sup>)'):
      result = regression('power', data);
      coef = result.equation;
      equation = 'y = x<sup>' + coef[1].toFixed(2) + '</sup>';
      break;
    case ('O(n)'):
      result = regression('linear', data);
      coef = result.equation;
      equation = 'y = x + ' + coef[1].toExponential(2);
      break;
    default:
      result = regression('linear', data);
      coef = result.equation;
      equation = 'y = x + ' + coef[1].toExponential(2);
      break;
  }

  console.log('equation from regression: ' + equation);

  return equation;
};
