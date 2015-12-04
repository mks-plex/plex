module.exports.evalAlg = function(userInput) {
	// powX represents tests for data size Math.pow(10, X)
	// skip pow1 because results not accurate for input size < 100
	var pow2 = runTimeAverage(dataHun, 6);
	var pow3 = runTimeAverage(dataThous, 6);
	var pow4 = runTimeAverage(dataTenThou, 3);
	var pow5 = getRunTime(dataHunThou);
	var pow6 = getRunTime(dataMil);
	// var pow7 = getRunTime(dataTenMil);  // <--- if feasible, add
	return [pow2, pow3, pow4, pow5, pow6];
}

module.exports.getCoords = function(data) {
	var coords = [];
	for (var i = 0; i < data.length; i++) {
		coords.push([data[i][1], data[i][0]]);
	}
	return coords;
}

function runTimeAverage(dbInput, iterations) {
	
}