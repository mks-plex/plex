var regression = require('regression');
var queries = require('./queries.js');
var utils = require('./utilities.js');
var Promise = require('bluebird');


var array = [[300, 10], [3000, 50]];
var string = JSON.stringify(array);


var net = require('net');
var pipe = new net.Socket({ fd: 3 });


Promise.resolve(queries.getData('integers'))
.then(function(response) {
  console.log('query worked');

  var data = response[0].array;
  var userInput;

  fs.readFileSync('server/testInputBuffer.txt', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    userInput = data;
  })

  fs.writeFile('server/testInputBuffer.txt', '', function() {
    console.log('done')
  })

  var results = JSON.stringify(timedTest(userInput, data)); 
  
  pipe.write('data from db', data.length);
  pipe.write('results', string);

});


// temporary test
pipe.write(string);

function timedTest(userInput, data) {
  var currentInputSize = 100;
  var maxInputSize = 20000;
  var avgCutoff = 500;
  var avgIterations = 3;
  var currentInputSize = 100;
  var stepFactor = 1000;
  var result = [];
  var runtime;

  while (currentInputSize < maxInputSize) {
    if (currentInputSize <= avgCutoff) {
      runtime = utils.runTimeAverage(userInput, data.slice(0, currentInputSize), avgIterations);
    } else {
      runtime = utils.getRunTime(userInput, data.slice(0, currentInputSize));
    }

    result.push(runtime);

    currentInputSize += stepFactor;
  }

  console.log('results of child', results);

  return result;
}

