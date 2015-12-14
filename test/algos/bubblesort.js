// Worst case O(n^2)

function bubbleSort(array) {
  var length = array.length;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < (length - i - 1); j++) {
      if(array[j] > array[j+1]) {
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }
  return array;
};

console.log(bubbleSort([6,7,3,4,5,6,2,3,4,5,6,71,2,3,54,3,2,3,43,7]));
