var memoBuild = module.exports.memoBuild = memoize(buildFunc);
module.exports.getFuncName = memoize(getFuncName);

module.exports.getRunTime = function(userInput, dbInput) {
  var userAlg = memoBuild(userInput);

  var time = process.hrtime();
  var result = userAlg(dbInput);
  var diff = process.hrtime(time);
  var runTime = (diff[0] * 1e9 + diff[1]) / 1e6;

  console.log('single runtime for N = ' + dbInput.length + ', run: ' + runTime);

  // returns [N, runtime in milliseconds]
  return [dbInput.length, Number(runTime.toFixed(3))];
};

function buildFunc(userInput) {
  console.log('building function');
  var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
  var algName = getFuncName(userInput);
  var wrappedAlg = recursionFix(userInput, algName, param);
  var userAlg = new Function(param, wrappedAlg);

  console.log('created ' + algName + ' algorithm');
  // console.log(userAlg.toString());

  return userAlg;
}

function recursionFix(string, name, param) {
  var insertBefore = 'var alg=function(' + param + '){';
  var insertAfter = 'return ' + name + '(' + param + ');}; return alg(' + param + ')';

  return insertBefore + string + insertAfter;
}

function getFuncName(string) {
  var dStop = string.indexOf('=');
  var eStop = string.indexOf('(');
  var funcName;

  if (string.substr(0,3) === 'var') {
    if (string[--dStop] === ' ') {
      funcName = string.slice(4, dStop);
    } else {
      funcName = string.slice(4, ++dStop);
    }
  } else if (string.substr(0, 8) === 'function') {
    if (string[--eStop] === ' ') {
      funcName = string.slice(9, eStop);
    } else {
      funcName = string.slice(9, ++eStop);
    }
  } else {
    return ('Please use a function expression or declaration\ne.g. `var myFunc = ...` or `function myFunc()...`');
  }

  return funcName;
}

function memoize(func) {
  var cached = {};

  return function() {
    var args = Array.prototype.slice.call(arguments);
    if (!cached[args]) {
      cached[args] = func.apply(this, arguments);
    }

    return cached[args];
  };
}
