var average = require('./average.js');

function getSlope(data) {
  var slopeArray = [];
  for (var index=0; index<data.length-1; index++) {
    var changeInTime = data[index+1][1] - data[index][1];
    var changeInSize = 100;
    slopeArray.push(changeInTime/changeInSize);
  }
  return slopeArray;
};

function standardDeviation(list) {
  var avg = average(list);
  var returnTotal = 0;
  for (var index=0; index<list.length; index++) {
    var coefficient = list[index] - avg;
    returnTotal += Math.pow(coefficient, 2);
  }
  return Math.sqrt(returnTotal/list.length);
};

function slopeStandardDev(data) {
  return standardDeviation(getSlope(data));
}

module.exports = slopeStandardDev;
