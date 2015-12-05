module.exports.evalAlg = function(userInput) {
	/** 
	powX represents tests for data size Math.pow(10, X)
	skip pow1 because results not accurate for input size < 100
	*/

	var data = queries.getSets(dataType);

	// TODO: add queries file, get data inputs from database, save in respective variables

	var pow2 = runTimeAverage(userInput, dataHun, 6);
	var pow3 = runTimeAverage(userInput, dataThous, 6);
	var pow4 = runTimeAverage(userInput, dataTenThou, 3);
	var pow5 = getRunTime(userInput, dataHunThou);
	var pow6 = getRunTime(userInput, dataMil);
	// var pow7 = getRunTime(dataTenMil);  // <--- if feasible, add

	return [pow2, pow3, pow4, pow5, pow6];
}

module.exports.getCoords = function(data) {
	var coords = [];
	for (var i = 0; i < data.length; i++) {
		coords.push([data[i][1], data[i][0]]);
	}

	// returns array of [runTime, N] for each input size
	return coords;
}

// ~~~~ not exported ~~~~

function runTimeAverage(userInput, dbInput, iterations) {
	var total = 0;
	var i = 0;
	var averageRun;
	var result;
	while (i < iterations) {
		var stats = getRunTime(userInput, dbInput);
		total += stats[0];
		i++;
	}
	averageRun = total / iterations;

	// return [avgRunTime, N, result, iterations] for N <= 10,000
	return [Number(averageRun.toFixed(3)), stats[1], stats[2], iterations];
}

function getRunTime(userInput, dbInput) {
	// FIXME: refactor to use process time and convert to milliseconds from nano

	var userAlg = buildFunc(userInput);
	var start = window.performance.now();
	var result = userAlg(data);
	var finish = window.performance.now();
	var runTime = finish - start;

	// returns [runtime, N, result]
	return [Number(runTime.toFixed(3)), data.length, result];
}

function buildFunc(userInput) {
	var metas = getMeta(userInput);
	var algString = userInput.slice(string.indexOf('{') + 1, string.lastIndexOf('}'));
	var userAlg = new Function(metas[1], algString);

	return userAlg;
}

function getMeta(string) {
	var param = string.slice(string.indexOf('(')+1, string.indexOf(')'));
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
      alert ('Please use a function expression or declaration\ne.g. `var myFunc = ...` or `function myFunc()...`');
    }
	return [funcName, param];
}



