function native(array) {
  return array.sort(function(a,b) {
    return a-b;
  });
};

module.exports = native;
