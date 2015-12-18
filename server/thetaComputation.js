var quicksort = require('./benchmarks/quicksort.js');
var countingsort = require('./benchmarks/countingsort.js');
var thetaHelpers = require('./thetaHelpers');

var possibleRunTimes = {'a': 'O(n)', 'b': 'O(n^2)', 'c': 'O(nlogn)'};

function computeTheta(algoData) {
  var quick = thetaHelpers.createDataSet(100, 10000, 1000, quicksort, 3);
  var counting = thetaHelpers.createDataSet(100, 10000, 1000, countingsort, 3);

  var standardDevQuick = thetaHelpers.sd(thetaHelpers.getSlope(quick));
  var standardDevCount = thetaHelpers.sd(thetaHelpers.getSlope(counting));

  // REPLACE WITH ALGORITHM DATA
  var standardDevAlgo = thetaHelpers.sd(getSlope(thetaHelpers.createDataSet(100, 10000, 1000, algorithm, 3)));

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
}
