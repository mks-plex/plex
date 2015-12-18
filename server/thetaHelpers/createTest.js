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

module.exports = createTest;
