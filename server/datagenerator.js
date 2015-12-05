var server = require('./server');
var faker = require('faker');

var integer=[];
for(var i=0; i<100; i++){
	integer.push(faker.random.number());
}
// console.log(integer);
module.exports = integer;