var quicksort = require('./thetaHelpers/benchmarks/quicksort.js');
var countingsort = require('./thetaHelpers/benchmarks/countingsort.js');
var createSingleTest = require('./thetaHelpers/createSingleTest.js');
var createTest = require('./thetaHelpers/createTest.js');
var createDataSet = require('./thetaHelpers/createDataSet.js');
var getRunTimeOnOneInput = require('./thetaHelpers/getRunTimeOnOneInput.js');
var slopeStandardDev = require('./thetaHelpers/slopeStandardDev.js');

var possibleRunTimes = {'a': 'O(n)', 'b': 'O(n^2)', 'c': 'O(nlogn)'};

// algoData is of the from [[inputSize, time]];


function computeTheta(algorithm) {

  var quick = createDataSet(100, 10000, 1000, quicksort, 3);
  var counting = createDataSet(100, 10000, 1000, countingsort, 3);
  var algoData = createDataSet(100, 10000, 1000, algorithm, 3);

  var standardDevQuick = slopeStandardDev(quick);
  var standardDevCount = slopeStandardDev(counting);
  var standardDevAlgo = slopeStandardDev(algoData);
  // REPLACE WITH ALGORITHM DATA

  if ( Math.abs((standardDevAlgo - standardDevQuick)) > (3*(standardDevQuick)) ) {
    return possibleRunTimes['b'];
  };

  var largeList = createSingleTest(100000);
  var linearLargeInput = getRunTimeOnOneInput(countingsort, largeList);
  var logarithmicLargeInput = getRunTimeOnOneInput(quicksort, largeList);
  var yourLargeInput = getRunTimeOnOneInput(algorithm, largeList);
  if (yourLargeInput < logarithmicLargeInput) {
    return possibleRunTimes['a'];
  }
  return possibleRunTimes['c'];
};

console.log(computeTheta(quicksort));
