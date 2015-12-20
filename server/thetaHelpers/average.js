function average(array) {
  var total = 0;
  var size = array.length;
  for (var index=0; index<size; index++) {
    total += array[index];
  }
  return (total/size).toFixed(3);
};

module.exports = average;
