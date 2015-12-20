function createSingleTest(size) {
  var testInput = new Array(size);
  for (var index=0; index<testInput.length; index++) {
    testInput[index] = Math.floor(Math.random()*10000);
  }
  return testInput;
};

module.exports = createSingleTest;
