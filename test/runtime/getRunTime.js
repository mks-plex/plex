/******YOU DO NOT NEED TO CHANGE ANY OF THE CODE BEFORE LINE 76******/

var fs = require('fs');

// This file is for testing purposes only. It is used for
// generating test data and running our test data on a variety
// of sorting algorithms.

// This function - the createTest function - creates a
// series of test data. This test data is an array of arrays.
// Each array is populated with an array in reverse (descending order).
// Min corresponsds to the length of the 'shortest array' and max corresponsds
// to the array with the largest length. Increment is the step in array
// length taken between consecutive arrays.
function createTest(min, max, increment) {
  var test = [], index, j, k;
  for (index=min; index<max; index=index+increment) {
    test.push(new Array(index));
  }
  for (j=0; j<test.length; j++) {
    for (k=0; k<test[j].length; k++) {
      test[j][k] = test[j].length - k;
    }
  }
  return test;
};

// This function takes in a sorting algorithm and a
// single unsorted array and returns a tuple where the first
// argument is the length of the sorted array and the second
// argument is the time in milliseconds the algorithm took
// to sort the array.
function getRunTime(algorithm, testInput) {
  var time = process.hrtime();
  algorithm(testInput);
  var diff = process.hrtime(time);
  var seconds = diff[0] * 1000;
  var milliseconds = diff[1]/1000000;
  returnTime = seconds + milliseconds;
  return [testInput.length, Number(returnTime.toFixed(3))];
};

// This function takes an average of the elements of an array.
function average(array) {
  var total = 0;
  var size = array.length;
  for (var index=0; index<size; index++) {
    total += array[index];
  }
  return total/size;
};

// This function returns an array of tuples where the first argument
// in a tuple is the size of the sorted array and the second element
// is the time it took for a specified algorithm to sort that array.
// The first four inputs of this algorithm correspond to the inputs
// of the createTest and getRunTime functions. The last inputs
// corresponds to how many times we run a function with the same
// sized input array to get an average of that running time.
function createDataSet(min, max, increment, algorithm, repetitions) {
  var results = [];
  var count = 0;
  var arraysOfInts = createTest(min, max, increment);
  for (var index=0; index<arraysOfInts.length; index++) {
    var repetitionArray = [];
    var funcResult = getRunTime(algo, arraysOfInts[index]);
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

/******CHANGE PARAMETERS BELOW******/

// Change the name of the last path to the name of the
// algorithm you want to test
// PUT ALGORITHM HERE
var algo = require('../algos/nativesort.js');

// ADD PARAMETRS HERE
var data = createDataSet(100, 10000, 100, algo, 15);

var csvContent = "";
data.forEach(function(infoArray, index){
   dataString = infoArray.join(",");
   csvContent += index < data.length ? dataString+ "\n" : dataString;
});

// NAME FILE HERE
fs.writeFile('data/native0.csv', csvContent, function(err) {
  if (err) throw err;
  console.log('Success!');
});
