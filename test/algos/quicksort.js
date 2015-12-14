// Worst case O(n^2)
// Average case O(nlogn)

function quickSort(items, left, right) {
  function swap(items, firstIndex, secondIndex){
      var temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
  }
  function partition(items, left, right) {
      var pivot   = items[Math.floor((right + left) / 2)],
          i = left,
          j = right;
      while (i <= j) {
          while (items[i] < pivot) {
              i++;
          }
          while (items[j] > pivot) {
              j--;
          }
          if (i <= j) {
              swap(items, i, j);
              i++;
              j--;
          }
      }
      return i;
  }
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}


console.log(quickSort([5,4,3,6,7,2,3,5,4,1,6,3,1], 5, 1));
