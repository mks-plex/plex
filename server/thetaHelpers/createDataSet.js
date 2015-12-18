var createTest = require('./createTest.js');
var average = require('./average.js');

function getRunTime(algorithm, testInput) {
  algorithm([1,2]);
  var time = process.hrtime();
  algorithm( testInput, Math.min.apply(null, testInput), Math.max.apply(null, testInput) );
  var diff = process.hrtime(time);
  var seconds = diff[0] * 1000;
  var milliseconds = diff[1]/1000000;
  returnTime = seconds + milliseconds;
  return [testInput.length, Number(returnTime.toFixed(3))];
};

function createDataSet(min, max, increment, algorithm, repetitions) {
  var results = [];
  var count = 0;
  var arraysOfInts = createTest(min, max, increment);
  for (var index=0; index<arraysOfInts.length; index++) {
    var repetitionArray = [];
    var funcResult = getRunTime(algorithm, arraysOfInts[index]);
    while (count < repetitions) {
      var inputSize = funcResult[0];
      repetitionArray.push(funcResult[1]);
      count++;
    }
    count = 0;
    results.push([funcResult[0], average(repetitionArray)]);
  }
  return results;
};

module.exports = createDataSet;
