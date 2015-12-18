function getRunTimeOnOneInput(algorithm, testInput) {
  algorithm([1,2]);
  var time = process.hrtime();
  var sort = algorithm(testInput, Math.min.apply(null, testInput), Math.max.apply(null, testInput));
  var diff = process.hrtime(time);
  var seconds = diff[0] * 1000;
  var milliseconds = diff[1]/1000000;
  returnTime = seconds + milliseconds;
  return Number(returnTime.toFixed(3));
};

module.exports = getRunTimeOnOneInput;
