// Worst case O(nlogn)

function mergeSort(arr){
  function merge(left, right){
    var result = [];
    while (left.length > 0 && right.length > 0){
      if (left[0] < right[0]){
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return result.concat(left).concat(right);
  };
  if (arr.length === 1) {
    return arr;
  }
  var middle = Math.floor(arr.length / 2),
      left   = arr.slice(0, middle),
      right  = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};