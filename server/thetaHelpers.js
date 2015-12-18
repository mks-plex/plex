function createTest(min, max, increment) {
  var test = [], index, j, k;
  for (index=min; index<max; index=index+increment) {
    test.push(new Array(index));
  }
  for (j=0; j<test.length; j++) {
    var littleLength = test[j].length;
    for (k=0; k<test[j].length; k++) {
      test[j][k] = Math.floor(Math.random()*littleLength);
    }
  }
  return test;
};

function createSingleTest(size) {
  var testInput = new Array(size);
  for (var index=0; index<testInput.length; index++) {
    testInput[index] = Math.floor(Math.random()*10000);
  }
  return testInput;
};

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

function getRunTimeOnOneInput(algorithm, testInput) {
  algorithm([1,2]);
  var time = process.hrtime();
  var sort = algorithm( testInput, Math.min.apply(null, testInput), Math.max.apply(null, testInput) );
  var diff = process.hrtime(time);
  var seconds = diff[0] * 1000;
  var milliseconds = diff[1]/1000000;
  returnTime = seconds + milliseconds;
  return Number(returnTime.toFixed(3));
};

function average(array) {
  var total = 0;
  var size = array.length;
  for (var index=0; index<size; index++) {
    total += array[index];
  }
  return (total/size).toFixed(3);
};

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
module.exports = standardDeviation;
module.exports = getSlope;
module.exports = getRunTimeOnOneInput;
